import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import BlurText from '../components/common/BlurText';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, description }) => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-7xl font-bold bg-gradient-to-r from-stellar-400 to-nebula-500 bg-clip-text text-transparent mb-4">
          🚀
        </div>
        <BlurText text="Coming Soon" className="text-3xl font-bold mb-4" />
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-space-300 mb-8 max-w-md mx-auto">
          {description || 'This page is coming soon. Stay tuned!'}
        </p>
        <a href="/" className="btn btn-primary inline-flex">
          <Home size={18} />
          <span>Back to Home</span>
        </a>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;