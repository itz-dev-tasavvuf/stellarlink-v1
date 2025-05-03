import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const interestCategories = [
  'Astronomy',
  'Rocketry',
  'Space Medicine',
  'Astrophysics',
  'Planetary Science',
  'Space Engineering',
  'Astrobiology',
  'Satellite Technology',
  'Space Policy',
  'Exoplanets',
];

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  searchQuery: string;
  interests: string[];
  location?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    updateFilters({ searchQuery: e.target.value, interests: selectedInterests, location });
  };

  const handleInterestToggle = (interest: string) => {
    let updatedInterests;
    if (selectedInterests.includes(interest)) {
      updatedInterests = selectedInterests.filter(i => i !== interest);
    } else {
      updatedInterests = [...selectedInterests, interest];
    }
    setSelectedInterests(updatedInterests);
    updateFilters({ searchQuery, interests: updatedInterests, location });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    updateFilters({ searchQuery, interests: selectedInterests, location: e.target.value });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedInterests([]);
    setLocation('');
    updateFilters({ searchQuery: '', interests: [], location: '' });
  };

  const updateFilters = (filters: FilterOptions) => {
    onFilterChange(filters);
  };

  const hasActiveFilters = searchQuery !== '' || selectedInterests.length > 0 || location !== '';

  return (
    <div className="card p-5">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
          <input
            type="text"
            placeholder="Search space enthusiasts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="input pl-10"
          />
        </div>
        
        {/* Location Input */}
        <div className="relative md:w-1/3">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-500" size={18} />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={handleLocationChange}
            className="input pl-10"
          />
        </div>
        
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="btn btn-secondary md:w-auto"
          >
            <X size={16} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
      
      {/* Interests */}
      <div>
        <h3 className="text-sm font-medium text-space-300 mb-3">Filter by interests</h3>
        <div className="flex flex-wrap gap-2">
          {interestCategories.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors duration-200 ${
                selectedInterests.includes(interest)
                  ? 'bg-stellar-700 text-white'
                  : 'bg-space-800 text-space-300 hover:bg-space-700'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      
      {/* Selected Filters Summary */}
      {hasActiveFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-space-800"
        >
          <div className="flex items-center gap-2 text-sm text-space-300">
            <span className="font-medium">Active filters:</span>
            {selectedInterests.length > 0 && (
              <span>{selectedInterests.length} interests</span>
            )}
            {location && (
              <span>Location: {location}</span>
            )}
            {searchQuery && (
              <span>Search: "{searchQuery}"</span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FilterPanel;