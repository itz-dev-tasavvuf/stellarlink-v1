/*
WARNING: SECURITY RISK - This application currently stores user data, including
sensitive information like passwords, directly in localStorage. This is highly
insecure and should only be used for demonstration or temporary development purposes.
A proper backend with secure password hashing and a database is essential for
managing user accounts and data securely in a production environment.*/
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    console.log('[AuthProvider] Initial load check...');
    const storedUser = localStorage.getItem('stellarlink_user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        console.log('[AuthProvider] User found in localStorage.');
      } catch (error) {
        console.error('[AuthProvider] Error parsing user from localStorage:', error);
        // Clear invalid data from localStorage
        localStorage.removeItem('stellarlink_user');
      }
    } else {
      console.log('[AuthProvider] No user found in localStorage.');
    }
    setLoading(false);
    console.log('[AuthProvider] Initial load check finished, loading set to false.');
  }, []);

  // Log auth state changes
  useEffect(() => {
    console.log('[AuthProvider] Auth state updated - loading:', loading, 'isAuthenticated:', isAuthenticated, 'currentUser:', currentUser ? currentUser.email : 'null');
  }, [loading, isAuthenticated, currentUser]);

  // Login function - for demo purposes
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true); // Set loading true while attempting login
    console.log('[AuthProvider] Attempting login...');
    try {
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
        console.log('[AuthProvider] Login successful for user:', user.email);
      } else {
        console.error('[AuthProvider] Login failed: Invalid credentials');
        throw new Error('Invalid login credentials');
      }
    } catch (error) {
      console.error('[AuthProvider] Login failed:', error);
      setIsAuthenticated(false);
      setCurrentUser(null); // Ensure user is null on failure
      throw error; // Re-throw the error to be caught by the login form
    } finally {
      setLoading(false); // Set loading false after attempt
      console.log('[AuthProvider] Login attempt finished, loading set to false.');
    }
  };

  // Register function - for demo purposes
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true); // Set loading true while attempting registration
    console.log('[AuthProvider] Attempting registration...');
    try {
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
        console.log('[AuthProvider] Registration successful for user:', user.email);
      } else {
        console.error('[AuthProvider] Registration failed: Invalid data');
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error('[AuthProvider] Registration failed:', error);
       setIsAuthenticated(false); // Ensure state is consistent on failure
       setCurrentUser(null);
      throw error; // Re-throw the error
    } finally {
       setLoading(false); // Set loading false after attempt
       console.log('[AuthProvider] Registration attempt finished, loading set to false.');
    }
  };

  // Logout function
  const logout = () => {
    console.log('[AuthProvider] Logging out...');
    localStorage.removeItem('stellarlink_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    console.log('[AuthProvider] Logout complete.');
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};