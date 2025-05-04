import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const TermsPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Terms & Conditions" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Terms of Service" description="Read our terms of service. Coming soon!" />
    </div>
  </div>
);

export default TermsPage;
