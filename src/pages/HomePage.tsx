import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Rocket, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import BlurText from '../components/common/BlurText';
import SpotlightCard from "../components/common/SpotlightCard";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
      </div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-stellar-300 via-stellar-500 to-nebula-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Connect with Space Enthusiasts Worldwide
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-space-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            StellarLink brings together aspiring astronauts, engineers, scientists, and space 
            enthusiasts on a global platform. Share your dreams, showcase achievements, and 
            forge connections that will shape the future of space exploration.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/register" className="btn btn-primary px-8 py-3">
              Join StellarLink
            </Link>
            <Link to="/map" className="btn btn-secondary px-8 py-3">
              Explore the Map
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-space-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Connect. Share. Discover.</h2>
            <p className="text-space-300 max-w-2xl mx-auto">
              StellarLink provides a platform for like-minded individuals to connect, share their passion, 
              and discover opportunities in the field of space exploration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <SpotlightCard>
 <motion.div 
 className="card p-6 flex flex-col items-center text-center"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 viewport={{ once: true }}
 >
 <div className="w-16 h-16 rounded-full bg-stellar-900/50 flex items-center justify-center mb-4">
 <Globe className="text-stellar-400" size={28} />
 </div>
 <h3 className="text-xl font-bold mb-2">Global Map</h3>
 <p className="text-space-300">
 Explore an interactive 3D globe showing space enthusiasts from around the world.
 </p>
 </motion.div>
 </SpotlightCard>
            {/* Feature 2 */}
            <SpotlightCard>
 <motion.div 
 className="card p-6 flex flex-col items-center text-center"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.1 }}
 viewport={{ once: true }}
 >
 <div className="w-16 h-16 rounded-full bg-nebula-900/50 flex items-center justify-center mb-4">
 <Users className="text-nebula-400" size={28} />
 </div>
 <h3 className="text-xl font-bold mb-2">Connect</h3>
 <p className="text-space-300">
 Build your network with fellow enthusiasts who share your passion for space.
 </p>
 </motion.div>
 </SpotlightCard>
            {/* Feature 3 */}
            <SpotlightCard>
 <motion.div 
 className="card p-6 flex flex-col items-center text-center"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 viewport={{ once: true }}
 >
 <div className="w-16 h-16 rounded-full bg-aurora-900/50 flex items-center justify-center mb-4">
 <Rocket className="text-aurora-400" size={28} />
 </div>
 <h3 className="text-xl font-bold mb-2">Share Dreams</h3>
 <p className="text-space-300">
 Document your space-related dreams, goals, and achievements with the community.
 </p>
 </motion.div>
 </SpotlightCard>
            {/* Feature 4 */}
            <SpotlightCard>
 <motion.div 
 className="card p-6 flex flex-col items-center text-center"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.3 }}
 viewport={{ once: true }}
 >
              <div className="w-16 h-16 rounded-full bg-comet-900/50 flex items-center justify-center mb-4">
                <Search className="text-comet-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p className="text-space-300">
                Find people with specific expertise or interests in various space-related fields.
              </p>
            </motion.div>
 </SpotlightCard>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="card overflow-hidden">
            <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-stellar-900/50 to-space-900/80 z-0"></div>
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Ready to join the space community?
                </motion.h2>
                
                <motion.p 
                  className="text-space-300 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Create your profile, pin your location on our global map, and start connecting 
                  with space enthusiasts around the world.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link to="/register" className="btn btn-primary px-8 py-3">
                    Create Your Profile
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Developer Credit */}
      <div className="flex flex-col items-center mt-12 mb-8">
        {/* Removed Lanyard component */}
        <div className="mt-4 text-center">
          <span className="text-space-400 text-sm">Developed by <span className="font-bold text-stellar-400">Tasavvuf Gori</span></span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;