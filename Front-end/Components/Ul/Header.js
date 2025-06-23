"use client";
import React, { useCallback, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.studentReducer);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProtectedNav = useCallback(
    (e, path) => {
      if (!isAuthenticated) {
        e.preventDefault();
        const toastId = "auth-toast";
        if (!toast.isActive(toastId)) {
          toast.error("Please log in to access this resource!", {
            toastId: toastId,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        window.location.href = path;
      }
    },
    [isAuthenticated]
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start items-center flex-1">
            <div className="flex items-center gap-2">
              <FcBriefcase className="text-3xl" />
              <h1 className="text-2xl font-bold tracking-tight  text-gray-800">
                <span className="text-blue-600 inline-block mt-1.5 ">Career</span>Hub
              </h1>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-500 no-underline font-medium  hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              onClick={(e) => handleProtectedNav(e, "/jobs")}
              className="text-blue-500 no-underline font-medium  hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            >
              Jobs / Internships
            </a>

            <div className="flex items-center gap-1 group cursor-pointer">
              <span className=" no-underline font-medium  group-hover:text-blue-600 transition-colors duration-200">
                Online Trainings
              </span>
              <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow-sm">
                OFFER'S
              </span>
            </div>

            <a
              onClick={(e) => handleProtectedNav(e, "/fresher-jobs")}
              className="text-blue-500 no-underline font-medium  hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            >
              Fresher Jobs
            </a>
            <Link
              href="/student"
              className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium hover:text-blue-700 transition-all duration-200 text-sm"
              onClick={() => {
                sessionStorage.setItem("showStudentToast", "true");
              }}
            >
              Student
            </Link>

            <Link
              href="/employe"
              className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 font-semibold text-sm"
            >
              Employer
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                onClick={(e) => {
                  handleProtectedNav(e, "/jobs");
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-500 no-underline  hover:text-blue-600 hover:bg-gray-50 cursor-pointer"
              >
                Jobs / Internships
              </a>

              <div className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-500 no-underline hover:bg-gray-50 cursor-pointer">
                <span className="hover:text-blue-600">Online Trainings</span>
                <span className="ml-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow-sm">
                  OFFER
                </span>
              </div>

              <a
                onClick={(e) => {
                  handleProtectedNav(e, "/fresher-jobs");
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-500 no-underline   hover:text-blue-600 hover:bg-gray-50 cursor-pointer"
              >
                Fresher Jobs
              </a>

              <Link
                href="/student"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
              >
                Student
              </Link>

              <Link
                href="/employe"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Employer
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
