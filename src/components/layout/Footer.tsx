import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-space-900/80 backdrop-blur-md border-t border-space-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="text-stellar-500" size={24} />
              <span className="text-lg font-bold bg-gradient-to-r from-stellar-400 to-stellar-600 bg-clip-text text-transparent">
                StellarLink
              </span>
            </Link>
            <p className="mt-3 text-space-400 text-sm">
              Connecting aspiring astronauts, engineers, scientists, and space enthusiasts worldwide.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a href="#" className="text-space-400 hover:text-stellar-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-space-400 hover:text-stellar-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-space-400 hover:text-stellar-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-space-400 hover:text-stellar-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/map" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Global Map
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Discover People
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/groups" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Groups
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/articles" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/resources/space-news" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Space News
                </Link>
              </li>
              <li>
                <Link to="/resources/careers" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Career Paths
                </Link>
              </li>
              <li>
                <Link to="/resources/learning" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Learning Materials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/support/help" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/support/contact" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/support/privacy" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/support/terms" className="text-space-400 hover:text-stellar-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-space-800 text-center text-space-400 text-sm">
          <p>&copy; {new Date().getFullYear()} StellarLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;