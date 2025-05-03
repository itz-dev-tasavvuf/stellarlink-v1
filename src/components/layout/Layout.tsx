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
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;