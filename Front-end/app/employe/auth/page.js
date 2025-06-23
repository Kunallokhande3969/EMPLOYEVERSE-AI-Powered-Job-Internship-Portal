"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FcBriefcase, FcBusinessman } from "react-icons/fc";
import { FiPlusCircle, FiUser, FiMail, FiPhone } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { employe } = useSelector((state) => state.employeReducer);

  useEffect(() => {
    const toastShown = localStorage.getItem("welcome-toast-shown");

    if (!toastShown) {
      if (employe) {
        toast.success(`Welcome back, ${employe.firstname}!`, {
          toastId: "welcome-toast",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else {
        toast.info("Welcome to CareerHub! Please login to access all features", {
          toastId: "login-prompt",
          position: "top-right",
          autoClose: 3000,
        });
      }
      localStorage.setItem("welcome-toast-shown", "true");
    }
  }, [employe]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <ToastContainer />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {/* Welcome Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <FcBriefcase className="text-4xl md:text-5xl" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            Welcome back{employe ? `, ${employe.firstname}` : ""}!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your job postings and find the best candidates for your organization
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          <Link href="/employe/auth/create/job">
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 cursor-pointer h-full hover:border-blue-200 hover:-translate-y-1">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                  <FiPlusCircle className="text-blue-600 text-xl md:text-2xl" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">Post a Job</h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">Create a new job listing</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/employe/auth/create/internship">
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 cursor-pointer h-full hover:border-green-200 hover:-translate-y-1">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <FiPlusCircle className="text-green-600 text-xl md:text-2xl" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">Create Internship</h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">Add new internship opportunity</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Organization Info */}
        {employe && (
          <div className="mt-10 md:mt-16 bg-white p-5 md:p-6 rounded-xl shadow-sm max-w-2xl mx-auto border border-gray-100">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FcBusinessman className="mr-2" /> Your Organization
            </h2>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-gray-500 pt-1">
                  <FiUser />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organization Name</p>
                  <p className="font-medium">{employe.organizationname}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-gray-500 pt-1">
                  <FiMail />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{employe.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-gray-500 pt-1">
                  <FiPhone />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{employe.contact || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      localStorage.cleareItem("welcome-toast-shown");

      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CareerHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
