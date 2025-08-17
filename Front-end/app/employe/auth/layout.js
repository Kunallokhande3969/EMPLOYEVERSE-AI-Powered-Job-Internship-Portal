"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { asynccurrentemploye, asynctemployesignout } from "@/store/Actions/employeAction";
import { removerorr } from "@/store/Reducers/employeReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeAuth = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasInitialErrors, setHasInitialErrors] = useState(false);
  const [hideNavigation, setHideNavigation] = useState(false);

  const { erorrs, isAuthenticated } = useSelector(
    (state) => state.employeReducer
  );

  // Check route and hide navigation if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHideNavigation(window.location.pathname === '/employe/auth');
    }
  }, []);

  // Check authentication and load current employee
  useEffect(() => {
    dispatch(asynccurrentemploye());
  }, [dispatch]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/employe/");
    }
  }, [isAuthenticated, router]);

  // Handle errors
  useEffect(() => {
    if (erorrs && erorrs.length > 0) {
      toast.dismiss();
      
      erorrs.forEach((err) => {
        if (err && typeof err === 'string' && err.trim() !== '') {
          toast.error(err, { 
            toastId: err,
            autoClose: 5000,
            position: "top-right",
            pauseOnHover: true,
            draggable: true,
            closeOnClick: false,
            className: 'toast-message'
          });
          
          if (err.includes("Please log in to access the resources")) {
            dispatch(removerorr());
          }
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
      className: 'toast-message'
    });
  };

  // Only render content if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
      
      {/* Conditionally render header */}
      {!hideNavigation && (
        <header className="bg-white shadow-md sticky top-0 z-50">
          {/* Your existing header code */}
        </header>
      )}

      {/* Main Content */}
      <main className={`${hideNavigation ? 'pt-0' : 'pt-4'} bg-gray-50`}>
        {children}
      </main>
    </>
  );
};

export default EmployeAuth; 