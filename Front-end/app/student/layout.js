"use client";
import React, { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  asynccurrentstudent,
  asynctstudentsignout,
} from "@/store/Actions/studentAction";
import { useRouter } from "next/navigation";
import { removerorr } from "@/store/Reducers/studentReducer";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const StudentLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { erorrs, isAuthenticated } = useSelector(
    (state) => state.studentReducer
  );

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/student/auth");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (erorrs && erorrs.length > 0) {
      toast.dismiss();
      erorrs.forEach((err) => {
        if (err) {
          toast.error(err, {
            toastId: err,
            autoClose: 5000,
            position: "top-right",
            pauseOnHover: true,
            draggable: true,
            closeOnClick: true,
          });

          if (err.includes("Please log in to access the resources")) {
            dispatch(removerorr());
          }
        }
      });
      dispatch(removerorr());
    }
  }, [erorrs, dispatch]);

  const SignoutHandler = () => {
    dispatch(asynctstudentsignout());
    toast.success("You have signed out successfully!", {
      toastId: "signout-success",
      autoClose: 5000,
      position: "top-right",
      pauseOnHover: true,
      draggable: true,
      closeOnClick: true,
    });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FcBriefcase className="text-3xl" />
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-blue-600">Career</span>Hub
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={isAuthenticated ? "/student/auth" : "/student"}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>

            <div className="flex items-center group cursor-pointer">
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium">
                Online Trainings
              </span>
              <span className="ml-1 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                OFFER
              </span>
            </div>

            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                if (!isAuthenticated) {
                  toast.error("Please login to access the resources.");
                  return;
                }
                toast.info(
                  "Please upload your resume and select the appropriate job or internship before analyzing."
                );
              }}
            >
              Analyze Resume+
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/student/auth/profile"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Profile
                </Link>
                <Link
                  href="/student/auth/resume"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Resume
                </Link>
                <Link
                  href="/student/auth/applied"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  My Application
                </Link>
                <button
                  onClick={SignoutHandler}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
                >
                  Signout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Main Page
                </Link>
                <Link
                  href="/student/signin"
                  className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Signin
                </Link>
                <Link
                  href="/student/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
                >
                  Signup
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <Link
                href={isAuthenticated ? "/student/auth" : "/student"}
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <div className="flex items-center py-2">
                <span className="text-gray-700 hover:text-blue-600 font-medium">
                  Online Trainings
                </span>
                <span className="ml-1 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  OFFER
                </span>
              </div>

              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  if (!isAuthenticated) {
                    toast.error("Please login to access the resources.");
                    return;
                  }
                  toast.info(
                    "Please upload your resume and select the appropriate job or internship before analyzing."
                  );
                }}
              >
                Analyze Resume+
              </Link>

              {isAuthenticated ? (
                <div className="space-y-3 pt-2 border-t border-gray-200">
                  <Link
                    href="/student/auth/profile"
                    className="block text-blue-500 hover:text-blue-700 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/student/auth/resume"
                    className="block text-blue-500 hover:text-blue-700 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Resume
                  </Link>
                  <Link
                    href="/student/auth/applied"
                    className="block text-blue-500 hover:text-blue-700 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Application
                  </Link>
                  <button
                    onClick={SignoutHandler}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full mt-2"
                  >
                    Signout
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-gray-200">
                  <Link
                    href="/"
                    className="block text-blue-500 hover:text-blue-700 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Main Page
                  </Link>
                  <Link
                    href="/student/signin"
                    className="block border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium py-2 px-4 rounded text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signin
                  </Link>
                  <Link
                    href="/student/signup"
                    className="block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full text-center mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;