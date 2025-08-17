"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { asyncstudentotppassword } from "@/store/Actions/studentAction";
import { toast } from "react-toastify";
import { useState } from "react";

const OTPPage = () => {
  const { errors } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const [changePasswordForm, setChangePasswordForm] = useState({
    email: "",
    otp: "",
    password: "",
  });

  // Handle form input changes
  const handleChangePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordForm({
      ...changePasswordForm,
      [name]: value,
    });
  };

  // Handle form submission
  const sendOtpHandler = async (e) => {
    e.preventDefault();

    // Debugging: Log form data
    console.log("Submitting form data:", changePasswordForm);

    try {
      await dispatch(asyncstudentotppassword(changePasswordForm));
      toast.success("Password changed successfully!");
      router.push("/student/signin/");
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Reset Your Password
        </h1>
        <form onSubmit={sendOtpHandler}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={changePasswordForm.email}
              onChange={handleChangePasswordInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* OTP Input */}
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter your OTP"
              required
              value={changePasswordForm.otp}
              onChange={handleChangePasswordInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              required
              value={changePasswordForm.password}
              onChange={handleChangePasswordInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Error Message */}
          {errors && (
            <p className="text-sm text-red-500 mb-4">
              {errors.message || "An error occurred. Please try again."}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 w-full text-white font-normal px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;