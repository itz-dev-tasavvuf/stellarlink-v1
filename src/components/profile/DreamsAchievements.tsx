import React from 'react';
import { Rocket, Trophy, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '../../types/user';

interface DreamsAchievementsProps {
  user: User;
  isCurrentUser?: boolean;
  onAddDream?: () => void;
  onAddAchievement?: () => void;
}

const DreamsAchievements: React.FC<DreamsAchievementsProps> = ({
  user,
  isCurrentUser = false,
  onAddDream,
  onAddAchievement
}) => {
  // Render nothing or a loading/placeholder state if user is null/undefined
  if (!user) {
    return null; 
  }

  const dreamVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Dreams Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Rocket className="text-stellar-500" size={20} />
            <h2 className="text-xl font-bold">Dreams</h2>
          </div>
          {isCurrentUser && onAddDream && (
            <button
              onClick={onAddDream}
              className="btn btn-ghost p-1"
              title="Add Dream"
            >
              <Plus size={18} />
            </button>
          )}
        </div>

        {user.dreams && user.dreams.length > 0 ? (
          <div className="space-y-4"> {/* Ensure user.dreams exists */}
            {user.dreams.map((dream, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={dreamVariants}
                className="bg-space-800/50 rounded-lg p-4 border border-space-700"
              >
                <h3 className="font-medium text-stellar-300">{dream.title}</h3>
                <p className="mt-2 text-sm text-space-300">{dream.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-space-400">
            <p>No dreams added yet</p>
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="text-nebula-500" size={20} />
            <h2 className="text-xl font-bold">Achievements</h2>
          </div>
          {isCurrentUser && onAddAchievement && (
            <button
              onClick={onAddAchievement}
              className="btn btn-ghost p-1"
              title="Add Achievement"
            >
              <Plus size={18} />
            </button>
          )}
        </div>

        {user.achievements && user.achievements.length > 0 ? (
          <div className="space-y-4"> {/* Ensure user.achievements exists */}
            {user.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={dreamVariants}
                className="bg-space-800/50 rounded-lg p-4 border border-space-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-nebula-300">{achievement.title}</h3>
                    <p className="text-xs text-space-400 mt-1">{achievement.date}</p>
                  </div>
                  {achievement.isVerified && (
                    <span className="bg-aurora-900/30 text-aurora-300 text-xs px-2 py-0.5 rounded-full border border-aurora-700/50">
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-space-300">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-space-400">
            <p>No achievements added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamsAchievements;