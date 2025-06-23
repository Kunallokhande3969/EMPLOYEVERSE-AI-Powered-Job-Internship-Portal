"use client";
import { useDispatch, useSelector } from "react-redux";
import { asyncstudentforgetpassword } from "@/store/Actions/studentAction";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPasswordPage = () => {
  const { errors } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    toast.dismiss(); // Clear old toast messages when page loads
    
    // Show error from Redux state if it exists
    if (errors && errors.message) {
      toast.error(errors.message);
    }
  }, [errors]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(asyncstudentforgetpassword({ email }));
      
      // Check if the action was successful
      if (result && result.error) {
        // Error will be handled by the useEffect watching errors
        return;
      }
      
      toast.success("Reset link sent successfully!");
      router.push("/student/forget/otp");
    } catch (error) {
      toast.error(error.message || "Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80%] w-full pt-[10%] bg-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      /> 

      <div className="text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md bg-white">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
       </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address below, and we'll send you a link to reset
          your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              required
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;