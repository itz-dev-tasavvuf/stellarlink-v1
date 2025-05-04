import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const HelpPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Help" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Help Center" description="Get help and find answers to your questions. Coming soon!" />
    </div>
  </div>
);

export default HelpPage;
