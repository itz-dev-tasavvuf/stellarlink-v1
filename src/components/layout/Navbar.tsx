import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Search, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, authUser } = useAuth(); // Access authUser

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Navigation links
  const navLinks = [
    { name: 'Map', path: '/map', icon: <Globe size={18} /> },
    { name: 'Discover', path: '/discover', icon: <Search size={18} /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-space-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Globe className="text-stellar-500" size={28} />
            <span className="text-xl font-bold bg-gradient-to-r from-stellar-400 to-stellar-600 bg-clip-text text-transparent">
              StellarLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-stellar-400'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile/me" 
                  className="btn btn-ghost"
                >
                  <User size={18} />
                  {/* Display user's name */}                  
                  <span>{authUser?.displayName || 'Profile'}</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="btn btn-secondary"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Join StellarLink
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-space-900/95 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 p-2 rounded-lg font-medium ${
                    location.pathname === link.path
                      ? 'bg-stellar-900/30 text-stellar-400'
                      : 'text-white/80 hover:bg-space-800/50 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 mt-4 border-t border-space-800 pt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile/me"
                      className="flex items-center gap-2 p-2 rounded-lg text-white/80 hover:bg-space-800/50 hover:text-white"
                      onClick={closeMenu}
                    >
                      <User size={18} />
                      {/* Display user's name */}                      
                      <span>{authUser?.displayName || 'Profile'}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="flex items-center gap-2 p-2 rounded-lg text-white/80 hover:bg-space-800/50 hover:text-white"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 p-2 rounded-lg text-white/80 hover:bg-space-800/50 hover:text-white"
                      onClick={closeMenu}
                    >
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-2 p-2 rounded-lg bg-stellar-600 hover:bg-stellar-700 text-white"
                      onClick={closeMenu}
                    >
                      <span>Join StellarLink</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;