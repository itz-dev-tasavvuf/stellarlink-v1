import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import { User } from '../types/user'; 

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate(); 
  const { authUser, isAuthenticated, loading: authLoading } = useAuth(); 

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async (idToFetch: string) => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("[ProfilePage] Attempting to fetch user with ID:", idToFetch); 
        const response = await fetch(`/api/users/${idToFetch}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}` 
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found.');
          } else if (response.status === 401 || response.status === 403) {
             if(userId === 'me') {
                console.log("[ProfilePage] Auth error on /profile/me, redirecting to login.");
                navigate('/login'); 
             } else {
                throw new Error('Unauthorized or Forbidden to view this profile.'); 
             }
          }
           else { 
            const errorBody = await response.text(); 
            console.error(`[ProfilePage] HTTP error details: ${response.status} - ${errorBody}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data: User = await response.json();
        setUser(data);
        setEditableUser(data);
        console.log("[ProfilePage] Successfully fetched user data:", data); 
      } catch (err: any) {
        console.error("[ProfilePage] Error fetching user data:", err);
        setError(err.message || 'Failed to fetch user data.');
        setUser(null);
        setEditableUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    console.log("[ProfilePage useEffect] Running. State:", { userId, isAuthenticated, authLoading, authUser });

    // Wait for authentication state to be determined
    if (authLoading) {
       console.log("[ProfilePage useEffect] Auth state still loading, waiting...");
       setIsLoading(true); 
       return; 
    }

    // Authentication state is determined (authLoading is false)
    if (userId === 'me') {
      console.log("[ProfilePage useEffect] Route is /profile/me.");
      if (isAuthenticated && authUser && authUser.uid) { 
        console.log("[ProfilePage useEffect] Authenticated user found, fetching own profile.");
        fetchUserData(authUser.uid); 
      } else if (!isAuthenticated) { 
         console.log("[ProfilePage useEffect] Not authenticated for /profile/me, redirecting.");
         navigate('/login'); 
         setIsLoading(false); 
      } else { 
         // This case is unexpected if isAuthenticated is true and authLoading is false
         console.error("[ProfilePage useEffect] Inconsistent state: isAuthenticated true, authLoading false, but authUser is null.");
         setError("Authentication state error. Please try logging in again.");
         setIsLoading(false); 
      }
    } else if (userId) {
      console.log("[ProfilePage useEffect] Route is /profile/:userId, fetching specific user.");
      // Optionally add a check here if you only want authenticated users to view other profiles
      // if (!isAuthenticated) { navigate('/login'); return; }
      fetchUserData(userId);
    } else { 
       console.log("[ProfilePage useEffect] No user ID provided in URL.");
       setError("No user ID provided.");
       setIsLoading(false);
       setUser(null);
       setEditableUser(null);
    }

  }, [userId, authUser, isAuthenticated, authLoading, navigate]); 

  // Handle update logic (simplified) - Only for authenticated user's own profile
  const handleUpdateProfile = async () => {
    if (!isAuthenticated || !authUser || !authUser.uid || !editableUser) { 
        console.error("[ProfilePage] Cannot update profile: User not authenticated or data missing.");
        setError("Authentication required to update profile.");
        return; 
    }

    setIsLoading(true); 
    setError(null); 

    try {
        console.log("[ProfilePage] Attempting to update user with ID:", authUser.uid); 
        console.log("[ProfilePage] Data being sent for update:", editableUser); 

        const response = await fetch(`/api/users/${authUser.uid}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` 
            },
            body: JSON.stringify(editableUser),
        });

        if (!response.ok) {
             if (response.status === 401 || response.status === 403) {
                throw new Error('Unauthorized or Forbidden to update profile. Please login again.');
             } else if (response.status === 400) {
                 const errorData = await response.json();
                 throw new Error(`Update failed: ${errorData.message || response.statusText}`);
             } else {
                throw new Error(`HTTP error! status: ${response.status}`);
             }
        }

        const updatedUserData: User = await response.json();
        setUser(updatedUserData); 
        setEditableUser(updatedUserData); 
        setIsEditing(false); 
        console.log("[ProfilePage] Profile updated successfully."); 

    } catch (err: any) {
        console.error("[ProfilePage] Error updating profile:", err);
        setError(err.message || 'Failed to update profile.');
        if (user) setEditableUser(user); 
    } finally {
        setIsLoading(false); 
    }
};

  if (authLoading || isLoading) return <div className="text-center text-white mt-8">Loading profile...</div>;
  
  if (error) return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
  if (!user) return <div className="text-center text-white mt-8">Profile not found or you do not have permission to view it.</div>; 

  return (
    <div className="profile-page container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{userId === 'me' ? 'My Profile' : user.name}
      </h1>
      <div>
        <p>Name: {user.name}</p>
        <p>Title: {user.title}</p>
         <p>Location: {user.location?.city}, {user.location?.country}</p>
         <p>Bio: {user.bio}</p>
         <div>Interests: {user.interests?.join(', ')}</div>

      </div>

       {userId === 'me' && isAuthenticated && ( 
           <button onClick={() => setIsEditing(!isEditing)} className="mt-4 p-2 bg-blue-500 text-white rounded">
               {isEditing ? 'Cancel Edit' : 'Edit Profile'}
           </button>
       )}

      {isEditing && editableUser && (
          <div className="mt-4">
              <h2>Edit Profile</h2>
              <div className="mb-2">
                  <label className="block text-white text-sm font-bold mb-2">Name:</label>
                  <input 
                      type="text" 
                      value={editableUser.name} 
                      onChange={(e) => setEditableUser({...editableUser, name: e.target.value})} 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              
               <button onClick={handleUpdateProfile} disabled={isLoading} className={`mt-2 p-2 bg-green-500 text-white rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
               </button>
               {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
          </div>
      )}
    </div>
  );
};

export default ProfilePage;