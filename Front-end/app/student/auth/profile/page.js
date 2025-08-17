"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asynctstudentupdate,
  asyncstudentavatar,
  asyncstudentresetpassword,
  asynccurrentstudent,
} from "@/store/Actions/studentAction";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentReducer);

  const fileInputRef = useRef(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [localAvatar, setLocalAvatar] = useState(null);

  // Edit mode state
  const [editMode, setEditMode] = useState(false);

  // Always fetch latest student info on page load
  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [dispatch]);

  // Pre-fill input fields whenever student info changes
  const [newStudentInfo, setNewStudentInfo] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    city: "",
    gender: "",
    email: "",
  });

  useEffect(() => {
    if (student) {
      setNewStudentInfo({
        firstname: student.firstname || "",
        lastname: student.lastname || "",
        contact: student.contact || "",
        city: student.city || "",
        gender: student.gender || "",
        email: student.email || "",
      });
    }
  }, [student]);

  useEffect(() => {
    setLocalAvatar(null);
  }, [student?.avatar?.url]);

  const [passwordResetData, setPasswordResetData] = useState({
    password: "",
  });

  const handleUpdateInfo = async () => {
    try {
      await dispatch(asynctstudentupdate(newStudentInfo));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handlePasswordReset = async () => {
    if (passwordResetData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      await dispatch(asyncstudentresetpassword(passwordResetData));
      toast.success("Password changed successfully!");
      setPasswordResetData({ password: "" });
    } catch (error) {
      toast.error(error.message || "Failed to change password");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPEG, PNG, GIF)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setLocalAvatar(file);
    toast.success("File Uploaded successfully!");
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setAvatarLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch("https://employeverse-ai-powered-job-internship.onrender.com/resume/upload-photo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.url) {
        toast.success("Avatar uploaded successfully!");
        await dispatch(asynctstudentupdate({ avatar: data.url }));
        await dispatch(asynccurrentstudent());
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        throw new Error(data.message || "Failed to upload avatar");
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  const avatarUrl = localAvatar
    ? URL.createObjectURL(localAvatar)
    : student?.avatar?.url || "/default-avatar.png";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and account security
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Avatar Section */}
          <section className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
                src={avatarUrl}
                onError={(e) => {
                  e.target.src = "/default-avatar.png";
                }}
              />
            </div>
            <div className="flex-grow">
              <form onSubmit={handleAvatarUpload} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Your Avatar
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="hidden">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={avatarLoading}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                      disabled={avatarLoading}
                    >
                      {avatarLoading ? "Uploading..." : "Upload File"}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  JPG, PNG or GIF. Max size of 2MB
                </p>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  disabled={avatarLoading}
                >
                  {avatarLoading ? "Uploading..." : "Save Avatar"}
                </button>
              </form>
            </div>
          </section>

          {/* Personal Information Section */}
          <section className="space-y-6">
            <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your personal details here
                </p>
              </div>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={newStudentInfo.firstname}
                  onChange={(e) =>
                    setNewStudentInfo({
                      ...newStudentInfo,
                      firstname: e.target.value,
                    })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={newStudentInfo.lastname}
                  onChange={(e) =>
                    setNewStudentInfo({
                      ...newStudentInfo,
                      lastname: e.target.value,
                    })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newStudentInfo.email}
                  onChange={(e) =>
                    setNewStudentInfo({
                      ...newStudentInfo,
                      email: e.target.value,
                    })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={newStudentInfo.contact}
                  onChange={(e) =>
                    setNewStudentInfo({
                      ...newStudentInfo,
                      contact: e.target.value,
                    })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newStudentInfo.city}
                  onChange={(e) =>
                    setNewStudentInfo({
                      ...newStudentInfo,
                      city: e.target.value,
                    })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={newStudentInfo.gender}
                  onChange={(e) =>
                    setNewStudentInfo({
                      ...newStudentInfo,
                      gender: e.target.value,
                    })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleUpdateInfo}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    // Reset fields to original student data
                    setNewStudentInfo({
                      firstname: student?.firstname || "",
                      lastname: student?.lastname || "",
                      contact: student?.contact || "",
                      city: student?.city || "",
                      gender: student?.gender || "",
                      email: student?.email || "",
                    });
                  }}
                  className="ml-2 px-5 py-2.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}
          </section>

          {/* Password Reset Section */}
          <section className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Change Password
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Set a new password for your account
              </p>
            </div>

            <div className="max-w-md space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={passwordResetData.password}
                  onChange={(e) =>
                    setPasswordResetData({
                      ...passwordResetData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="At least 6 characters"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handlePasswordReset}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Change Password
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;