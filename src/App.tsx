import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';

// Pages
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { AuthProvider } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              
              <Route path="map" element={
                <RequireAuth>
                  <MapPage />
                </RequireAuth>
              } />
              
              <Route path="profile/:id" element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              } />
              
              <Route path="discover" element={
                <RequireAuth>
                  <DiscoverPage />
                </RequireAuth>
              } />
              
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;