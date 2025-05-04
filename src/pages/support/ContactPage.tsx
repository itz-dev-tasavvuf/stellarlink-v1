import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const ContactPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Contact" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Contact Us" description="Reach out to the StellarLink team. Coming soon!" />
    </div>
  </div>
);

export default ContactPage;
