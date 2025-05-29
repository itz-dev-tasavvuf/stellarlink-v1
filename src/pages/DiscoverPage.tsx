import React, { useState, useEffect } from 'react';
import FilterPanel, { FilterOptions } from '../components/discover/FilterPanel'; // Import FilterOptions
import UserCard from '../components/discover/UserCard';
import { useUserData } from '../context/UserDataContext'; // Import useUserData
import { User } from '../types/user'; // Import User type

const DiscoverPage: React.FC = () => {
  const { users, loading, error } = useUserData(); // Get users and loading state from context

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // State to hold filtered users
  // State to hold current filter options, initialized with default values
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: '',
    interests: [],
    location: '',
  });

  // Function to handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  // Effect to filter users whenever the users data or filter options change
  useEffect(() => {
    if (users.length > 0) {
      const { searchQuery, interests, location } = filterOptions;

      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseLocation = location?.toLowerCase();

      const filtered = users.filter(user => {
        // Filter by search query (name or title)
        const matchesSearch = !searchQuery || 
                              user.name.toLowerCase().includes(lowerCaseSearchQuery) ||
                              user.title.toLowerCase().includes(lowerCaseSearchQuery);

        // Filter by interests
        const matchesInterests = interests.length === 0 || 
                               interests.some(interest => user.interests.includes(interest));

        // Filter by location (city or country)
        const matchesLocation = !location || 
                                user.location.city.toLowerCase().includes(lowerCaseLocation) ||
                                user.location.country.toLowerCase().includes(lowerCaseLocation);

        return matchesSearch && matchesInterests && matchesLocation;
      });

      setFilteredUsers(filtered);
    }
  }, [users, filterOptions]); // Re-run effect when users or filterOptions change

  if (loading) {
    return <div className="text-center text-white mt-8">Loading users...</div>; // Loading state
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">Error loading users: {error.message}</div>; // Error state
  }

  return (
    // Main container with flex properties for centering and padding
    <div className="discover-page flex flex-col p-4">
      {/* Content container: Filter and User List */}
      <div className="w-full mx-auto">
        {/* Pass the handleFilterChange function to the FilterPanel */}
        <FilterPanel onFilterChange={handleFilterChange} /> 
        {/* Display User Cards based on filteredUsers */}
        <div className="mt-6 space-y-4">
          {filteredUsers.map(user => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;