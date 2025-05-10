import React from 'react';
import { MapPin, Calendar, Mail, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '../../types/user';
import InterestBadge from '../common/InterestBadge';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser?: boolean;
  onEditProfile?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user, 
  isCurrentUser = false, 
  onEditProfile 
}) => {
  if (!user) return null;

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-40 bg-gradient-to-r from-space-800 to-stellar-900 relative">
        {/* Profile image */}
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 rounded-full border-4 border-space-900 overflow-hidden">
            <img 
              src={user.profileImage || 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Edit button for current user */}
        {isCurrentUser && onEditProfile && (
          <button 
            onClick={onEditProfile}
            className="absolute top-4 right-4 btn btn-secondary"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      <div className="pt-20 px-8 pb-8">
        {/* Name and title */}
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-space-300 mt-1">{user.title}</p>
        
        {/* User details */}
        <div className="mt-4 space-y-2">
 {user.location?.city && user.location?.country && (
 <>
 <div className="flex items-center gap-2 text-space-300">
 <MapPin size={16} />
 <span>{user.location.city}, {user.location.country}</span>
 </div>
          
 <div className="flex items-center gap-2 text-space-300">
 <Calendar size={16} />
 <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
 </div>
 </>
 )}

 {user.email && (
            <div className="flex items-center gap-2 text-space-300">
 <Mail size={16} />
 <span>{user.email}</span>
            </div>
 )}

 {user.website && (
            <div className="flex items-center gap-2 text-space-300">
 <LinkIcon size={16} />
 <a
                href={user.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-stellar-400 hover:text-stellar-300 transition-colors"
 >
                {user.website.replace(/^https?:\/\//, '')}
 </a>
            </div>
 )}
        </div>
        
        {/* Interests */}
        <div className="mt-6">
          <h3 className="text-space-300 text-sm font-medium mb-2">Interests</h3>
          {user.interests && user.interests.length > 0 && (<div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <InterestBadge key={index} interest={interest} />
 ))}
 </div>
 )}
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="text-space-300 text-sm font-medium mb-2">Bio</h3>
          <p className="text-white/90">{user.bio || 'No bio available.'}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;