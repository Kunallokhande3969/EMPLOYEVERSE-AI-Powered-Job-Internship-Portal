"use client";
import React, { useCallback, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.studentReducer);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProtectedNav = useCallback((e, path) => {
    if (!isAuthenticated) {
      e?.preventDefault();
      const toastId = "auth-toast";
      if (!toast.isActive(toastId)) {
        toast.error("Please log in to access this resource!", {
          toastId,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      router.push(path);
    }
  }, [isAuthenticated, router]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Link */}
          <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
            <div className="flex items-center gap-2">
              <FcBriefcase className="text-3xl" />
              <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-blue-600">Career</span>Hub
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center py-4 space-x-6">
            <Link 
              href="/jobs" 
              onClick={(e) => handleProtectedNav(e, "/jobs")}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm md:text-base"
            >
              Jobs / Internships
            </Link>

            <div className="flex items-center group cursor-pointer">
              <span className="text-blue-600 group-hover:text-blue-800 font-medium transition-colors text-sm md:text-base">
                Online Trainings
              </span>
              <span className="ml-1.5 bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                OFFER
              </span>
            </div>

            <Link 
              href="/fresher-jobs" 
              onClick={(e) => handleProtectedNav(e, "/fresher-jobs")}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm md:text-base"
            >
              Fresher Jobs
            </Link>

            <div className="flex items-center space-x-3 ml-2">
              <Link
                href="/student"
                className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium text-sm transition-colors whitespace-nowrap"
                onClick={() => {
                  sessionStorage.setItem("showStudentToast", "true");
                  closeMobileMenu();
                }}
              >
                Student
              </Link>
              <Link
                href="/employe"
                className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm shadow-sm hover:shadow-md transition-all whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                Employer
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden bg-white transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-4 py-3 space-y-2 border-t border-gray-200">
            <Link
              href="/jobs"
              onClick={(e) => {
                handleProtectedNav(e, "/jobs");
                closeMobileMenu();
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Jobs / Internships
            </Link>

            <div className="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors">
              <span>Online Trainings</span>
              <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                OFFER
              </span>
            </div>

            <Link
              href="/fresher-jobs"
              onClick={(e) => {
                handleProtectedNav(e, "/fresher-jobs");
                closeMobileMenu();
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Fresher Jobs
            </Link>

            <div className="pt-2 space-y-2">
              <Link
                href="/student"
                onClick={() => {
                  sessionStorage.setItem("showStudentToast", "true");
                  closeMobileMenu();
                }}
                className="block w-full px-3 py-2.5 rounded-md text-center text-base font-medium text-blue-600 border border-blue-500 hover:bg-blue-50 transition-colors"
              >
                Student
              </Link>
              <Link
                href="/employe"
                onClick={closeMobileMenu}
                className="block w-full px-3 py-2.5 rounded-md text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Employer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;