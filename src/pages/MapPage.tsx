
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlobeVisualization from '../components/map/GlobeVisualization';
import BlurText from '../components/common/BlurText';
import { User } from '../types/user';

const MapPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Assuming your backend runs on the same origin
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array means this effect runs only once on mount
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <BlurText text="Map" className="text-3xl font-bold mb-4" />
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Global Space Community</h1>
          <p className="text-space-300 mt-2">
            Explore our interactive map to discover space enthusiasts around the world. 
            Click on pins to view profiles and connect with like-minded individuals.
          </p>
        </motion.div>
        
        <motion.div
          className="card h-[calc(100vh-200px)] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <GlobeVisualization userData={users} />
        </motion.div>
      </div>
    </div>
  );
};

export default MapPage;