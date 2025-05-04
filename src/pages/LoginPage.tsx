import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import Starfield from '../components/common/Starfield';
import BlurText from '../components/common/BlurText';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield starCount={150} />
      
      {/* Header */}
      <header className="p-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="text-stellar-500" size={28} />
            <span className="text-xl font-bold bg-gradient-to-r from-stellar-400 to-stellar-600 bg-clip-text text-transparent">
              StellarLink
            </span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 card">
          <BlurText text="Login" className="text-3xl font-bold mb-4" />
          <LoginForm />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-space-400 text-sm">
        <p>&copy; {new Date().getFullYear()} StellarLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;