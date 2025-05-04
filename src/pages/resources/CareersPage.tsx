import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const CareersPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Careers" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Career Paths" description="Explore career opportunities in the space industry. Coming soon!" />
    </div>
  </div>
);

export default CareersPage;
