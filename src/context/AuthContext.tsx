import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('stellarlink_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function - for demo purposes
  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate login validation
    if (email && password) {
      const user = {
        id: '1',
        name: 'Demo User',
        email,
      };
      
      localStorage.setItem('stellarlink_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid login credentials');
    }
  };

  // Register function - for demo purposes
  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate registration
    if (name && email && password) {
      const user = {
        id: '1',
        name,
        email,
      };
      
      localStorage.setItem('stellarlink_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid registration data');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('stellarlink_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};