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
      // Clear existing toasts
      toast.dismiss();

      // Show new toasts with consistent timing
      erorrs.forEach((err) => {
        if (err) {
          // Only show toast if error exists
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
    <div className="no-underline">
      <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Left Logo Section */}
          <div className="flex items-center gap-2">
            <FcBriefcase className="text-3xl" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              <span className="text-blue-600 inline-block mt-2">Career</span>Hub
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
          <nav className="hidden md:flex gap-4 items-center text-base font-medium text-gray-700">
            <Link
              href={isAuthenticated ? "/student/auth" : "/student"}
              className="hover:text-blue-600 transition-colors no-underline duration-200"
            >
              Home
            </Link>

            <div className="flex items-center gap-1 group cursor-pointer">
              <span className="group-hover:text-blue-600 transition-colors duration-200">
                Online Trainings
              </span>
              <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow-sm">
                OFFER
              </span>
            </div>

            <Link
              href="#"
              className="hover:text-blue-600 no-underline transition-colors duration-200 py-2 border-b border-gray-100"
              onClick={(e) => {
                e.preventDefault();
                const isResumeSelected = false; // apna logic yahan lagao
                const isJobSelected = false; // apna logic yahan lagao

                if (!isAuthenticated) {
                  toast.error("please login to access the resources .");
                  return;
                }
                if (isAuthenticated) {
                  toast.info(
                    "Please upload your resume and select the appropriate job or internship before analyzing."
                  );
                  return;
                }

                setIsMenuOpen(false); // agar zarurat ho to
                // aage navigation ya koi aur action
              }}
            >
              Analyze Resume+
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  className="me-4 text-blue-500 no-underline hover:text-blue-700"
                  href="/student/auth/profile"
                >
                  Profile
                </Link>
                <Link
                  className="me-4 text-blue-500 no-underline hover:text-blue-700"
                  href="/student/auth/resume"
                >
                  Resume
                </Link>
                <Link
                  className="me-4 text-blue-500 no-underline hover:text-blue-700"
                  href="/student/auth/applied"
                >
                  My Application
                </Link>
                <button
                  className="bg-blue-500 no-underline hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
                  onClick={SignoutHandler}
                >
                  Signout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="relative inline-block no-underline text-blue-500 me-4 group hover:text-blue-700"
                >
                  Main Page
                </Link>

                <Link
                  className="bg-transparent me-4 no-underline hover:bg-blue-500 text-blue-700 font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-colors duration-200"
                  href="/student/signin"
                >
                  Signin
                </Link>
                <Link
                  className="bg-blue-500 no-underline hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
                  href="/student/signup"
                >
                  Signup
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white w-full px-4 pb-4 shadow-lg">
            <div className="flex flex-col space-y-3 text-base font-medium text-gray-700">
              <Link
                href={isAuthenticated ? "/student/auth" : "/student"}
                className="hover:text-blue-600 transition-colors no-underline duration-200 py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <div className="flex items-center gap-1 group cursor-pointer py-2 border-b border-gray-100">
                <span className="group-hover:text-blue-600 transition-colors duration-200">
                  Online Trainings
                </span>
                <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow-sm">
                  OFFER
                </span>
              </div>

              <Link
                href="#"
                className="hover:text-blue-600 no-underline transition-colors duration-200 py-2 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  const isResumeSelected = false; // apna logic yahan lagao
                  const isJobSelected = false; // apna logic yahan lagao

                  if (!isResumeSelected || !isJobSelected) {
                    toast.info(
                      " upload your resume and select the appropriate job or internship before analyzing."
                    );
                    return;
                  }
                  if (isAuthenticated) {
                    toast.error(
                      "plase select the appropriate job or internship before analyzing."
                    );
                    return;
                  }

                  setIsMenuOpen(false); // agar zarurat ho to
                  // aage navigation ya koi aur action
                }}
              >
                Analyze Resume+
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    className="text-blue-500 no-underline py-2 border-b border-gray-100 hover:text-blue-700"
                    href="/student/auth/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    className="text-blue-500 no-underline py-2 border-b border-gray-100 hover:text-blue-700"
                    href="/student/auth/resume"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Resume
                  </Link>
                  <Link
                    className="text-blue-500 no-underline py-2 border-b border-gray-100 hover:text-blue-700"
                    href="/student/auth/applied"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Application
                  </Link>
                  <button
                    className="bg-blue-500 no-underline hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full text-left transition-colors duration-200 mt-2"
                    onClick={SignoutHandler}
                  >
                    Signout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="text-blue-500 no-underline py-2 border-b border-gray-100 hover:text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Main Page
                  </Link>

                  <Link
                    className="bg-transparent no-underline hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-center transition-colors duration-200 my-2"
                    href="/student/signin"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signin
                  </Link>
                  <Link
                    className="bg-blue-500 no-underline hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center transition-colors duration-200"
                    href="/student/signup"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
    </div>
  );
};

export default StudentLayout;
