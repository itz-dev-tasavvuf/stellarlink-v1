import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Starfield from '../common/Starfield';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      {/* Added pt-20 to the main content area to prevent content from being hidden behind the fixed navbar */}
      <main className="flex-grow overflow-y-auto pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;