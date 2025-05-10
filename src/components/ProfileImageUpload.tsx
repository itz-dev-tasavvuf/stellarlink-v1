import React, { useState } from 'react';
import axios from 'axios';

interface ProfileImageUploadProps {
  userId: string; // Assuming userId is a string, adjust if necessary
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      // Replace with your actual upload endpoint
      const response = await axios.post(`/api/users/uploadProfileImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Include any necessary authentication headers (e.g., a JWT token)
          // Assuming you have a way to get the auth token, e.g., from context or local storage
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        // You might need to pass userId in the URL or body depending on your backend
        // For this example, we assume the backend gets the user ID from the authenticated request
      });

      console.log('Upload successful:', response.data);
      // You might want to update the user's profile image URL in your application's state
      // or trigger a data refetch after successful upload
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed.');
    }
  };

  return (
    <div>
      <h3>Profile Image</h3>
      {previewImage && (
        <img
          src={previewImage}
          alt="Profile Preview"
          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
        />
      )}
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload Image
      </button>
    </div>
  );
};

export default ProfileImageUpload;