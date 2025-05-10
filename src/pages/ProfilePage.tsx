import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/profile/ProfileHeader';
import DreamsAchievements from '../components/profile/DreamsAchievements';
import { useUserData } from '../context/UserDataContext';
import ProfileImageUpload from '../components/ProfileImageUpload';
import { useAuth } from '../context/AuthContext';
import BlurText from '../components/common/BlurText';
import { User } from '../types/user';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users, isLoading: isContextLoading } = useUserData();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form state for adding new items
  const [newInterest, setNewInterest] = useState('');
  const [newDreamTitle, setNewDreamTitle] = useState('');
  const [newDreamDescription, setNewDreamDescription] = useState('');
  const [newAchievementTitle, setNewAchievementTitle] = useState('');
  const [newAchievementDescription, setNewAchievementDescription] = useState('');
  const [feedback, setFeedback] = useState<{ message: string | null; type: 'success' | 'error' | null }>({ 
    message: null, 
    type: null 
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        // Case 1: 'me' route - fetch current user data
        if (id === 'me' && currentUser) {
          // For safety, check if currentUser has an id property
          const userId = currentUser._id || currentUser.id;
          
          if (!userId) {
            console.error('No user ID available for fetching profile data');
            setUser(null);
            setEditableUser(null);
            return;
          }
          
          console.log("Fetching user with ID:", userId);
          try {
            const response = await fetch(`/api/users/${userId}`, {
              headers: {
                'x-access-token': localStorage.getItem('token') || '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            });
            
            if (!response.ok) {
              const responseText = await response.text();
              console.error('API Error Response:', responseText);
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error('Expected JSON response but got: ' + contentType);
            }
            
            const data = await response.json();
            setUser(data);
            setEditableUser(data);
            setIsCurrentUser(true);
          } catch (apiError) {
            console.error('API fetch error:', apiError);
            // Fallback to using currentUser data directly
            console.log('Using currentUser data as fallback');
            setUser(currentUser);
            setEditableUser(currentUser);
            setIsCurrentUser(true);
          }
        } 
        // Case 2: specific user ID and users are loaded
        else if (id !== 'me' && users.length > 0) {
          const foundUser = users.find(u => u._id === id || u.id === id);
          setUser(foundUser || null);
          setIsCurrentUser(!!(currentUser && (foundUser?._id === currentUser._id || foundUser?.id === currentUser.id)));
          setEditableUser(currentUser && (foundUser?._id === currentUser._id || foundUser?.id === currentUser.id) ? foundUser : null);
        } else {
          // Case 3: not 'me' route and no users loaded yet
          setUser(null);
          setEditableUser(null);
          setIsCurrentUser(false);
        }
      } catch (error) {
        console.error('Error in profile data processing:', error);
        setUser(null);
        setEditableUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id, currentUser, users]);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        [name]: value,
      });
    }
  };

  const handleAddInterest = () => {
    if (editableUser && editableUser.interests && newInterest.trim() !== '' && !editableUser.interests.includes(newInterest.trim())) {
      setEditableUser(prevEditableUser => {
        if (prevEditableUser) {
          return { ...prevEditableUser, interests: [...(prevEditableUser.interests || []), newInterest.trim()] };
        } return null; });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index: number) => {
    // Add a check for editableUser.interests before attempting to filter
    if (editableUser && editableUser.interests) {
      setEditableUser({
        ...editableUser,
        interests: editableUser.interests.filter((_, i) => i !== index),
      });
    }
  };

  const handleAddDream = () => {
    if (editableUser && newDreamTitle.trim() !== '' && newDreamDescription.trim() !== '') {
      setEditableUser({
        ...editableUser, 
        dreams: [...(editableUser.dreams || []), { 
          title: newDreamTitle.trim(), 
          description: newDreamDescription.trim() 
        }],
      });
      setNewDreamTitle('');
      setNewDreamDescription('');
    }
  };

  const handleRemoveDream = (index: number) => {
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        dreams: (editableUser.dreams || []).filter((_, i) => i !== index),
      });
    }
  };

  const handleAddAchievement = () => {
    if (editableUser && newAchievementTitle.trim() !== '' && newAchievementDescription.trim() !== '') {
      setEditableUser({
        ...editableUser,
        achievements: [...(editableUser.achievements || []), {
          title: newAchievementTitle.trim(),
          description: newAchievementDescription.trim(),
          date: '',
          isVerified: false
        }],
      });
      setNewAchievementTitle('');
      setNewAchievementDescription('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        achievements: (editableUser.achievements || []).filter((_, i) => i !== index),
      });
    }
  };

  const handleUpdateProfile = async () => {
    if (!editableUser || !currentUser) return;
    
    try {
      // Use either _id or id property, whichever is available
      const userId = currentUser._id || currentUser.id;
      
      if (!userId) {
        throw new Error('No user ID available for updating profile');
      }
      console.log("Update profile fetch URL:", `/api/users/${userId}`);

      console.log("Updating user with ID:", userId);
      console.log("Data being sent:", editableUser);
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify(editableUser),

      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update profile error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      try {
        const updatedUser = await response.json();
        setFeedback({ message: 'Profile updated successfully!', type: 'success' });
        console.log("Update successful, received user data:", updatedUser);
        setUser(updatedUser);
        setIsEditMode(false);
      } catch (jsonError) {
        console.error('Error parsing JSON from update response:', jsonError);
        // If we can't parse the response but the request was successful,
        // still consider it a success and use the editableUser data
        setFeedback({ message: 'Profile likely updated successfully!', type: 'success' });
        setUser(editableUser);
        console.log("Update likely successful, using editableUser data:", editableUser);
        setIsEditMode(false);
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setFeedback({ 
        message: error.message || 'Failed to update profile.', 
        type: 'error' 
      });
    }
  };

  // Render loading state
  if (isLoading || isContextLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-stellar-400 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stellar-500 mb-4"></div>
          <p>Loading Profile...</p>
        </div>
      </div>
    );
  }

  // Render user not found state
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

  // Render edit mode (for current user only)
  if (isCurrentUser && isEditMode && editableUser) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <BlurText text="Edit Profile" className="text-3xl font-bold mb-4" />
          <motion.form
            key="edit-form"
            onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {feedback.message && (
              <div className={`p-3 rounded ${feedback.type === 'success' ? 'bg-aurora-900 text-aurora-300' : 'bg-nebula-900 text-nebula-300'}`}>
                {feedback.message}
              </div>
            )}
            
            {currentUser && <ProfileImageUpload userId={currentUser._id} />}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                type="text"
                name="title"
                value={editableUser?.title || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            {/* Interests Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Interests</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {editableUser.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stellar-800 text-stellar-300"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(index)}
                      className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
 >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  className="flex-grow bg-space-800 border border-space-700 text-white rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-stellar-500 focus:border-stellar-500 sm:text-sm"
                  placeholder="Add new interest"
                />
                <button 
                  type="button" 
                  onClick={handleAddInterest} 
                  className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-stellar-600 hover:bg-stellar-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-500"
 >
                  Add
                </button>
              </div>
            </div>

            {/* Dreams Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Dreams</label>
              <div className="mt-1 space-y-2">
                {editableUser.dreams?.map((dream, index) => (
                  <div key={index} className="border border-space-700 rounded-md p-2 text-space-300">
                    <div className="flex justify-between items-center">
                      <strong className="text-sm">{dream.title}</strong>
                      <button
                        type="button"
                        onClick={() => handleRemoveDream(index)}
                        className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-nebula-400 hover:bg-nebula-700 hover:text-white focus:outline-none focus:bg-nebula-500 focus:text-white"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">{dream.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 space-y-2">
                <input 
                  type="text" 
                  value={newDreamTitle} 
                  onChange={(e) => setNewDreamTitle(e.target.value)} 
                  placeholder="Dream Title"
                  className="block w-full bg-space-800 border border-space-700 text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-stellar-500 focus:border-stellar-500 sm:text-sm" 
                />
                <textarea 
                  value={newDreamDescription} 
                  onChange={(e) => setNewDreamDescription(e.target.value)} 
                  placeholder="Dream Description"
                  rows={2}
                  className="block w-full bg-space-800 border border-space-700 text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-stellar-500 focus:border-stellar-500 sm:text-sm"
                ></textarea>
                <button 
                  type="button" 
                  onClick={handleAddDream} 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Dream
                </button>
              </div>
            </div>

            {/* Achievements Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Achievements</label>
              <div className="mt-1 space-y-2">
                {editableUser.achievements?.map((achievement, index) => (
                  <div key={index} className="border border-space-700 rounded-md p-2 text-space-300">
                    <div className="flex justify-between items-center">
                      <strong className="text-sm">{achievement.title}</strong>
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(index)}
                        className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-nebula-400 hover:bg-nebula-700 hover:text-white focus:outline-none focus:bg-nebula-500 focus:text-white"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 space-y-2">
                <input 
                  type="text" 
                  value={newAchievementTitle} 
                  onChange={(e) => setNewAchievementTitle(e.target.value)} 
                  placeholder="Achievement Title"
                  className="block w-full bg-space-800 border border-space-700 text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-stellar-500 focus:border-stellar-500 sm:text-sm" 
                />
                <textarea 
                  value={newAchievementDescription} 
                  onChange={(e) => setNewAchievementDescription(e.target.value)} 
                  placeholder="Achievement Description"
                  rows={2}
                  className="block w-full bg-space-800 border border-space-700 text-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-stellar-500 focus:border-stellar-500 sm:text-sm"
                ></textarea>
                <button 
                  type="button" 
                  onClick={handleAddAchievement} 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Achievement
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
 >
                Update Profile
              </button>
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="flex-1 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
 >
                Cancel
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    ) as JSX.Element; // Explicit cast needed here after styling changes
  }

  // Render static view mode (for own profile or other user's profile)
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <BlurText text="Profile" className="text-3xl font-bold mb-4" />
        <motion.div
          className="grid grid-cols-1 gap-6"
          key="view-mode"
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