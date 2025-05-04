import React from 'react';
import ComingSoonPage from './ComingSoonPage';
import BlurText from '../components/common/BlurText';

const GroupsPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Groups" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Groups" description="Find and join space-related groups and communities. Coming soon!" />
    </div>
  </div>
);

export default GroupsPage;
