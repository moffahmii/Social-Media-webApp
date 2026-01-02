import React, { useEffect, useState, useContext } from 'react';
import { getUserDataApi } from '../Services/AuthServices';
import LoadingScreen from '../Components/LoadingScreen';
import UserPosts from '../Components/UserPosts';
import { uploadUserPhotoApi } from '../Services/UserServices';
import { Link } from 'react-router-dom'; // مهم جداً للـ Link

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleUploadPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const oldPhoto = userData.photo;

    setUserData(prev => ({ ...prev, photo: previewUrl }));
    setIsUploading(true);
    setUploadError("");

    try {
      const response = await uploadUserPhotoApi(file);

      if (response?.message === "success" && response.user) {
        setUserData(prev => ({ ...prev, photo: response.user.photo }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setUserData(prev => ({ ...prev, photo: oldPhoto }));
      setUploadError("Failed to upload photo. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(previewUrl);
    }
  }

  async function getUserData() {
    try {
      setIsLoading(true);
      const response = await getUserDataApi();
      if (response?.message === "success" && response.user) {
        setUserData(response.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading || !userData) {
    return <div className="w-4/6 mx-auto mt-10"><LoadingScreen /></div>;
  }

  return (
    <div className="container py-10">
      <div className='w-[95%] md:w-5/6 lg:w-4/6 mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-6'>
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">

          <div className="relative group">
            <img
              src={userData.photo || "/default-avatar.png"}
              alt={userData.name}
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-500 shadow-sm transition-opacity ${isUploading ? 'opacity-50' : 'opacity-100'}`}
            />

            <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} disabled={isUploading} />
              <span className="text-sm">✎</span>
            </label>

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{userData.name}</h1>
            <p className='text-gray-500'>{userData.email}</p>

            {/* Badges + Change Password Link */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge text={userData.gender} color="blue" />
              <Badge text={userData.dateOfBirth} color="gray" />

              <Link
                to="/change-password"
                className="px-3 py-1 bg-blue-600 text-white text-xs md:text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Change Password
              </Link>
            </div>

            {uploadError && <p className="mt-2 text-red-500 text-sm animate-pulse">{uploadError}</p>}
          </div>
        </div>
      </div>

      <UserPosts userId={userData._id} />
    </div>
  )
}

function Badge({ text, color }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100"
  };
  return (
    <span className={`px-3 py-1 text-xs md:text-sm rounded-full font-medium border ${styles[color]}`}>
      {text || "N/A"}
    </span>
  );
}
