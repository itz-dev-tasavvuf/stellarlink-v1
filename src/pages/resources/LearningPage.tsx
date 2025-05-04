import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const LearningPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Learning" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Learning Materials" description="Access learning resources for space enthusiasts. Coming soon!" />
    </div>
  </div>
);

export default LearningPage;
