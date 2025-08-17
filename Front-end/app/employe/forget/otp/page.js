"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { asyncemployeotppassword } from "@/store/Actions/employeAction";
import { useState } from "react";

const EmployeeOTPPasswordPage = () => {
  const { errors } = useSelector((state) => state.employeReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [changePasswordForm, setChangePasswordForm] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const SendOtpHandler = async (e) => {
    e.preventDefault();
    await dispatch(asyncemployeotppassword(changePasswordForm));
    router.push("/employe/signin/");
  };

  const handleChangePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordForm({
      ...changePasswordForm,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Change Password
        </h1>
        <form onSubmit={SendOtpHandler} className="space-y-6">
          <div>
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
              required
              value={changePasswordForm.email}
              onChange={handleChangePasswordInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
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
              className="mt-1 px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
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
              className="mt-1 px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeOTPPasswordPage;
