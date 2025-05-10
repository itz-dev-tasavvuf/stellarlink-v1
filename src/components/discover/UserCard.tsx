import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '../../types/user';
import InterestBadge from '../common/InterestBadge';

interface UserCardProps {
  user: User;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card hover:border-stellar-700 transition-all duration-300 transform hover:scale-103 hover:shadow-xl hover:shadow-stellar-500/20"
    >
      <Link to={`/profile/${user.id}`} className="block p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={user.profileImage || 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-white">{user.name}</h3>
            <p className="text-sm text-space-300">{user.title}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-space-400">
              <MapPin size={12} />
              <span>{user.location.city}, {user.location.country}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {user.interests.slice(0, 3).map((interest, i) => (
              <InterestBadge key={i} interest={interest} size="sm" />
            ))}
            {user.interests.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-space-800 text-space-300">
                +{user.interests.length - 3} more
              </span>
            )}
          </div>
          
          <p className="text-sm text-space-300 line-clamp-2">{user.bio}</p>
        </div>
        
        {user.dreams.length > 0 && (
          <div className="mt-3 px-3 py-2 bg-space-800/50 rounded-lg">
            <p className="text-xs text-stellar-300 font-medium">Dream: {user.dreams[0].title}</p>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default UserCard;