import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserCard from '../components/discover/UserCard';
import FilterPanel, { FilterOptions } from '../components/discover/FilterPanel';
import { useUserData } from '../context/UserDataContext';
import { User } from '../types/user';

const DiscoverPage: React.FC = () => {
  const { users, isLoading } = useUserData();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    interests: []
  });

  useEffect(() => {
    if (users.length > 0) {
      applyFilters(filters);
    }
  }, [users, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const applyFilters = (filterOptions: FilterOptions) => {
    let result = [...users];
    
    // Apply search query filter
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query) ||
        user.title.toLowerCase().includes(query)
      );
    }
    
    // Apply interests filter
    if (filterOptions.interests.length > 0) {
      result = result.filter(user => 
        filterOptions.interests.some(interest => 
          user.interests.some(userInterest => 
            userInterest.toLowerCase().includes(interest.toLowerCase())
          )
        )
      );
    }
    
    // Apply location filter
    if (filterOptions.location) {
      const locationQuery = filterOptions.location.toLowerCase();
      result = result.filter(user =>
        user.location.city.toLowerCase().includes(locationQuery) ||
        user.location.country.toLowerCase().includes(locationQuery)
      );
    }
    
    setFilteredUsers(result);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Discover Space Enthusiasts</h1>
          <p className="text-space-300 mt-2">
            Find and connect with people who share your passion for space exploration.
            Filter by interests, location, and more.
          </p>
        </motion.div>
        
        {/* Filter Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <FilterPanel onFilterChange={handleFilterChange} />
        </motion.div>
        
        {/* User Cards */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-stellar-400 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stellar-500 mb-4"></div>
              <p>Loading Users...</p>
            </div>
          </div>
        ) : (
          <>
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user, index) => (
                  <UserCard key={user.id} user={user} index={index} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <h3 className="text-xl font-bold mb-2">No users found</h3>
                <p className="text-space-300">
                  Try adjusting your filters to find more people.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;