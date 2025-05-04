import React from 'react';
import ComingSoonPage from '../ComingSoonPage';
import BlurText from '../../components/common/BlurText';

const ArticlesPage: React.FC = () => (
  <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 py-8">
      <BlurText text="Articles" className="text-3xl font-bold mb-4" />
      <ComingSoonPage title="Articles" description="Read insightful articles from the space community. Coming soon!" />
    </div>
  </div>
);

export default ArticlesPage;
