import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { FaUser, FaLock, FaCamera } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { BaseUrl, patch } from '../services/Endpoint';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setUser } from '../redux/AuthSlice';

// Define a User type based on the Redux state structure
interface User {
  FullName: string;
  profile: string;
}

interface ProfileParams {
  userId: string;
}

const Profile: React.FC = () => {
  const { userId } = useParams<ProfileParams>(); // Extract userId from route params
  const dispatch = useDispatch();

  // States for profile data
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  // Fetch user from Redux store
  const user = useSelector((state: { auth: { user: User } }) => state.auth.user);

  useEffect(() => {
    if (user) {
      setName(user.FullName); // Initialize name with user's full name
    }
  }, [user]);

  // Handle profile image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  // Handle form submission to update profile
  const handleUpdateProfile = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('FullName', name);
    formData.append('oldpassword', oldPassword);
    formData.append('newpassword', newPassword);
    if (profileImage) {
      formData.append('profile', profileImage);
    }

    try {
      const response = await patch(`auth/profile/${userId}`, formData);
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message); // Show success message
        dispatch(setUser(data.user)); // Update Redux store with new user data
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Show error message from API
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Update Profile</h1>
      <form className="profile-form" onSubmit={handleUpdateProfile}>
        <div className="profile-image-section">
          <label htmlFor="profileImage" className="profile-image-label">
            {profileImage ? (
              <img src={URL.createObjectURL(profileImage)} alt="Avatar" className="profile-image" />
            ) : (
              <div className="profile-placeholder">
                <img src={`${BaseUrl}/images/${user.profile}`} alt="Avatar" className="profile-image" />
              </div>
            )}
            <FaCamera className="profile-camera-icon" />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="profile-image-input"
          />
        </div>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Update Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-input"
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="profile-input"
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="profile-input"
          />
        </div>

        <button type="submit" className="profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
