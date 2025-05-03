import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { generateMockUsers } from '../utils/mockData';

interface UserDataContextType {
  users: User[];
  isLoading: boolean;
}

const UserDataContext = createContext<UserDataContextType>({
  users: [],
  isLoading: true,
});

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load mock data
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock users
        const mockUsers = generateMockUsers(30);
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <UserDataContext.Provider value={{ users, isLoading }}>
      {children}
    </UserDataContext.Provider>
  );
};