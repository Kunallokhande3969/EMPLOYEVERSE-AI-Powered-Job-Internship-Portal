"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asynccurrentemploye,
  asynctemployeupdate,
  asyncemployeorganizationLogo,
  asyncemployeresetpassword,
} from "@/store/Actions/employeAction";
import { toast } from "react-toastify";

const EmployeProfilePage = () => {
  const dispatch = useDispatch();
  const { employe } = useSelector((state) => state.employeReducer);

  const [editMode, setEditMode] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Personal info state for edit mode only
  const [info, setInfo] = useState({
    name: "",
    email: "",
    contact: "",
    organization: "",
    city: "",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({ password: "" });

  // Fetch employee data on mount
  useEffect(() => {
    dispatch(asynccurrentemploye());
  }, [dispatch]);

  // Debug: See what employe object looks like
  useEffect(() => {
    console.log("Employe object:", employe);
  }, [employe]);

  // When entering edit mode, copy employe data to info state
  useEffect(() => {
    if (editMode && employe) {
      setInfo({
        name: `${employe.firstname || ""} ${employe.lastname || ""}`.trim(),
        email: employe.email || "",
        contact: employe.contact || "",
        organization: employe.organizationname || "",
        city: employe.city || "",
      });
    }
  }, [editMode, employe]);

  // Logo upload handler
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    toast.info("Uploading logo...");
    setLogoLoading(true);
    try {
      await dispatch(asyncemployeorganizationLogo(file));
      toast.success("Logo uploaded successfully!");
    } catch {
      toast.error("Logo upload failed!");
    } finally {
      setLogoLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Personal info update
  const handleUpdateInfo = async () => {
    try {
      await dispatch(
        asynctemployeupdate({
          ...info,
          firstname: info.name.split(" ")[0] || "",
          lastname: info.name.split(" ").slice(1).join(" ") || "",
          organizationname: info.organization,
        })
      );
      toast.success("Profile updated!");
      setEditMode(false);
    } catch {
      toast.error("Update failed!");
    }
  };

  // Password change
  const handlePasswordReset = async () => {
    if (passwordData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    try {
      await dispatch(asyncemployeresetpassword(passwordData));
      toast.success("Password changed!");
      setPasswordData({ password: "" });
    } catch {
      toast.error("Password change failed!");
    }
  };

  // Logo URL
  const logoUrl = employe?.organizationLogo?.url || "/default-avatar.png";

  // Agar employe data nahi aayi to loading dikhaye
  if (!employe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Employe Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your organization information and account security
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Logo Section */}
          <section className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
                src={logoUrl}
                alt="Organization Logo"
                onError={(e) => {
                  e.target.src = "/default-avatar.png";
                }}
              />
            </div>
            <div className="flex-grow">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Organization Logo
                </label>
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="block"
                    disabled={logoLoading}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                    disabled={logoLoading}
                  >
                    {logoLoading ? "Uploading..." : "Upload"}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  JPG, PNG or GIF. Max size of 2MB
                </p>
              </div>
            </div>
          </section>

          {/* Personal Information Section */}
          <section className="space-y-6">
            <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Organization Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your organization details here
                </p>
              </div>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={
                    editMode
                      ? info.name
                      : `${employe.firstname || ""} ${
                          employe.lastname || ""
                        }`.trim()
                  }
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editMode ? info.email : employe.email || ""}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="text"
                  value={editMode ? info.contact : employe.contact || ""}
                  onChange={(e) =>
                    setInfo({ ...info, contact: e.target.value })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  value={
                    editMode
                      ? info.organization
                      : employe.organizationname || ""
                  }
                  onChange={(e) =>
                    setInfo({ ...info, organization: e.target.value })
                  }
                  disabled={!editMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                  onClick={() => setEditMode(false)}
                  className="ml-2 px-5 py-2.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}
          </section>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
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

export default EmployeProfilePage;
