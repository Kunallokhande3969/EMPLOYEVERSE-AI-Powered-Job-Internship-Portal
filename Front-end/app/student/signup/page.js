"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { asynctstudentsignup } from "@/store/Actions/studentAction";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const SignupPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [studentSignupForm, setStudentSignupForm] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    city: "",
    gender: "Male",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Account created successfully!"); // Show success toast
      router.push("/student/auth");
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors = {};
    if (!studentSignupForm.firstname.trim())
      newErrors.firstname = "Required field";
    if (!studentSignupForm.lastname.trim())
      newErrors.lastname = "Required field";
    if (!studentSignupForm.contact.trim()) newErrors.contact = "Required field";
    if (!studentSignupForm.city.trim()) newErrors.city = "Required field";
    if (!studentSignupForm.email.trim()) {
      newErrors.email = "Required field";
    } else if (!/^\S+@\S+\.\S+$/.test(studentSignupForm.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!studentSignupForm.password) {
      newErrors.password = "Required field";
    } else if (studentSignupForm.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SignupHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await dispatch(asynctstudentsignup(studentSignupForm));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentSignupForm({
      ...studentSignupForm,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer /> {/* Add ToastContainer */}
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Student Account
          </h1>
          <p className="text-gray-500 mt-2">
            Start your career journey with us
          </p>
        </div>

        <form
          onSubmit={SignupHandler}
          className="space-y-4 bg-white p-8 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={studentSignupForm.firstname}
                onChange={handleStudentInputChange}
                className={`w-full px-3 py-2 text-sm border rounded-md ${
                  errors.firstname ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.firstname && (
                <p className="mt-1 text-xs text-red-500">{errors.firstname}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={studentSignupForm.lastname}
                onChange={handleStudentInputChange}
                className={`w-full px-3 py-2 text-sm border rounded-md ${
                  errors.lastname ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.lastname && (
                <p className="mt-1 text-xs text-red-500">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={studentSignupForm.contact}
              onChange={handleStudentInputChange}
              className={`w-full px-3 py-2 text-sm border rounded-md ${
                errors.contact ? "border-red-300" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={studentSignupForm.city}
              onChange={handleStudentInputChange}
              className={`w-full px-3 py-2 text-sm border rounded-md ${
                errors.city ? "border-red-300" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={studentSignupForm.gender}
              onChange={handleStudentInputChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={studentSignupForm.email}
              onChange={handleStudentInputChange}
              className={`w-full px-3 py-2 text-sm border rounded-md ${
                errors.email ? "border-red-300" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={studentSignupForm.password}
              onChange={handleStudentInputChange}
              className={`w-full px-3 py-2 text-sm border rounded-md ${
                errors.password ? "border-red-300" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out mt-4"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              href="/student/signin"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
