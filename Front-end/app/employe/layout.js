"use client";
import React, { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  asynccurrentemploye,
  asynctemployesignout,
} from "@/store/Actions/employeAction";
import { useRouter } from "next/navigation";
import { removerorr } from "@/store/Reducers/employeReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasInitialErrors, setHasInitialErrors] = useState(false);

  const { erorrs, isAuthenticated } = useSelector(
    (state) => state.employeReducer
  );

  useEffect(() => {
    dispatch(asynccurrentemploye());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/employe/auth");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (erorrs && erorrs.length > 0) {
      toast.dismiss();
      erorrs.forEach((err) => {
        toast.error(err, {
          toastId: err,
          autoClose: 5000,
          position: "top-right",
          pauseOnHover: true,
          draggable: true,
          closeOnClick: false,
          delay: hasInitialErrors ? 0 : 300,
        });

        if (err?.includes("Please log in to access the resources")) {
          dispatch(removerorr());
        }
      });

      if (!hasInitialErrors) {
        setHasInitialErrors(true);
      }
      dispatch(removerorr());
    }
  }, [erorrs, dispatch, hasInitialErrors]);

  const SignoutHandler = () => {
    dispatch(asynctemployesignout());
    toast.success("You have signed out successfully!", {
      toastId: "signout-success",
      autoClose: 5000,
      position: "top-right",
      pauseOnHover: true,
      draggable: true,
    });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <FcBriefcase className="text-3xl" />
              <h1 className="text-xl font-bold text-gray-800">
                <span className="text-blue-600">Career</span>Hub
              </h1>
            </div>

            {/* Mobile menu button - only visible on small screens */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
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

            {/* Desktop Navigation - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Link
                href={isAuthenticated ? "/employe/auth" : "/employe"}
                className="px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 no-underline"
              >
                Home
              </Link>
              
              <div className="relative group">
                <div className="flex items-center px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Online Trainings
                  <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    OFFER
                  </span>
                </div>
              </div>
              
              <Link
                href="#"
                className="px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 no-underline"
              >
                Fresher Jobs
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/employe/auth/profile"
                    className="px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 no-underline"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/employe/auth/applied"
                    className="px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 no-underline"
                  >
                    My Applications
                  </Link>
                  <button
                    onClick={SignoutHandler}
                    className="ml-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 text-sm lg:text-base"
                  >
                    Signout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="px-3 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Main Page
                  </Link>
                  <Link
                    href="/employe/signin"
                    className="border border-blue-500 text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200 text-sm lg:text-base"
                  >
                    Signin
                  </Link>
                  <Link
                    href="/employe/signup"
                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 text-sm lg:text-base"
                  >
                    Signup
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Mobile Navigation - only visible when menu is open */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 transition-all duration-300 ease-in-out">
              <div className="flex flex-col space-y-1 mt-2">
                <Link
                  href={isAuthenticated ? "/employe/auth" : "/employe"}
                  className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                <div className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
                  Online Trainings
                  <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    OFFER
                  </span>
                </div>
                
                <Link
                  href="#"
                  className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fresher Jobs
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/employe/auth/profile"
                      className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/employe/auth/applied"
                      className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Applications
                    </Link>
                    <button
                      onClick={SignoutHandler}
                      className="w-full text-left px-3 py-3 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors mt-2"
                    >
                      Signout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/"
                      className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Main Page
                    </Link>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Link
                        href="/employe/signin"
                        className="px-3 py-3 rounded-md text-base font-medium border border-blue-500 text-blue-600 hover:bg-blue-50 text-center transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Signin
                      </Link>
                      <Link
                        href="/employe/signup"
                        className="px-3 py-3 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 text-center transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Signup
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </>
  );
};

export default EmployeLayout;