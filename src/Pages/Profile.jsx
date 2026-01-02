import React, { useEffect, useState } from 'react';
import { getUserDataApi } from '../Services/AuthServices';
import { uploadUserPhotoApi } from '../Services/UserServices';
import { Link } from 'react-router-dom';
import { Card, CardBody, Avatar, Button, Chip, Skeleton, Tooltip, Divider } from '@heroui/react';
import { Camera, Lock, Mail, Calendar, User as UserIcon } from 'lucide-react';
import UserPosts from '../Components/UserPosts';

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
      setUploadError("Failed to upload photo.");
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-4"> {/* تم التعديل لـ max-w-xl */}
        <Card className="p-8 shadow-sm rounded-2xl">
          <div className="flex flex-col items-center gap-6">
            <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full shrink-0" />
            <div className="flex flex-col gap-3 w-full items-center">
              <Skeleton className="h-8 w-2/3 rounded-lg" />
              <Skeleton className="h-5 w-1/2 rounded-lg" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-4/6 mx-auto py-10 px-4">
      <Card className="w-full bg-white/80 backdrop-blur-md shadow-sm border border-slate-100 rounded-2xl overflow-hidden">
        <CardBody className="p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative group shrink-0">
              <Avatar
                src={userData.photo}
                className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-xl"
                isBordered
                color={isUploading ? "primary" : "default"}
              />
              <Tooltip content="Update Photo" placement="bottom">
                <label className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform z-20">
                  <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} disabled={isUploading} />
                  <Camera size={20} />
                </label>
              </Tooltip>
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-[1px] z-10">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="space-y-4 w-full flex flex-col items-center">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
                  {userData.name}
                  <Chip size="sm" variant="flat" color="primary">User</Chip>
                </h1>
                <p className="text-slate-500 flex items-center justify-center gap-2 mt-1 font-medium">
                  <Mail size={16} /> {userData.email}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Chip variant="flat" size="md" color="default" className="bg-slate-100 font-bold text-slate-600 border-none px-4 py-1">
                  {userData.gender || "Gender"}
                </Chip>
                <Chip variant="flat" size="md" color="default" className="bg-slate-100 text-slate-600 border-none px-4 py-1">
                  {userData.dateOfBirth || "Birth Date"}
                </Chip>
              </div>
              <div className="pt-2 w-full flex justify-center">
                <Button
                  as={Link}
                  to="/change-password"
                  variant="flat"
                  color="primary"
                  radius="full"
                  size="md"
                  startContent={<Lock size={18} />}
                  className="font-bold w-full max-w-64 shadow-sm"
                >
                  Change Password
                </Button>
              </div>
              {uploadError && (
                <p className="text-danger text-xs font-bold animate-pulse mt-2">{uploadError}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="mt-12 w-full">
        <div className="flex items-center gap-3 mb-8">
          <Divider className="flex-1 opacity-50" />
          <h2 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] shrink-0">Your Feed</h2>
          <Divider className="flex-1 opacity-50" />
        </div>
        <UserPosts userId={userData._id} />
      </div>
    </div>
  );
}