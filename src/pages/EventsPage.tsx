import React from 'react';
import ComingSoonPage from './ComingSoonPage';
import BlurText from '../components/common/BlurText';

const EventsPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Events" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Events" description="Discover upcoming space events, conferences, and meetups. Coming soon!" />
    </div>
  </div>
);

export default EventsPage;
