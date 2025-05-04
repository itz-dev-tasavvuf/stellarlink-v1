import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const PrivacyPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Privacy Policy" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Privacy Policy" description="Read our privacy policy. Coming soon!" />
    </div>
  </div>
);

export default PrivacyPage;
