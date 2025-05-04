import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/profile/ProfileHeader';
import DreamsAchievements from '../components/profile/DreamsAchievements';
import { useUserData } from '../context/UserDataContext';
import { useAuth } from '../context/AuthContext';
import BlurText from '../components/common/BlurText';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users, isLoading } = useUserData();
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (users.length > 0 && id) {
      // For demo purposes, if id is "me", show current user's profile
      if (id === 'me' && currentUser) {
        setUser(users.find(u => u.id === currentUser.id));
        setIsCurrentUser(true);
      } else {
        const foundUser = users.find(u => u.id === id);
        setUser(foundUser);
        setIsCurrentUser(currentUser?.id === id);
      }
    }
  }, [id, users, currentUser]);

  const handleEditProfile = () => {
    // In a real app, this would open a profile edit form
    console.log('Edit profile');
  };

  const handleAddDream = () => {
    // In a real app, this would open a form to add a dream
    console.log('Add dream');
  };

  const handleAddAchievement = () => {
    // In a real app, this would open a form to add an achievement
    console.log('Add achievement');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-stellar-400 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stellar-500 mb-4"></div>
          <p>Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-space-300">The user you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <BlurText text="Profile" className="text-3xl font-bold mb-4" />
        <motion.div 
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <ProfileHeader 
            user={user} 
            isCurrentUser={isCurrentUser} 
            onEditProfile={handleEditProfile} 
          />
          
          {/* Dreams & Achievements */}
          <DreamsAchievements 
            user={user} 
            isCurrentUser={isCurrentUser}
            onAddDream={handleAddDream}
            onAddAchievement={handleAddAchievement}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;