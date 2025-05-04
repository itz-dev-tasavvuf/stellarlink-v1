import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const SpaceNewsPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Space News" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Space News" description="Stay updated with the latest news in space exploration. Coming soon!" />
    </div>
  </div>
);

export default SpaceNewsPage;
