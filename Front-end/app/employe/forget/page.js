"use client"
import { useDispatch, useSelector } from 'react-redux';
import { asyncemployeforgetpassword } from '@/store/Actions/employeAction';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForgetPasswordPage = () => {
  const { errors } = useSelector((state) => state.employeReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState({
    email: '',
  });

  // Show error toast when errors change
  useEffect(() => {
    if (errors && errors.message) {
      toast.error(errors.message);
    }
  }, [errors]);

  const SendEmailHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(asyncemployeforgetpassword(email));
      
      // Check if the action was successful
      if (result && !result.error) {
        toast.success('Password reset link sent successfully!');
        router.push('/employe/forget/otp');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link');
    }
  };

  const handleEmployeeSendMailInputChange = (e) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your registered email to receive a password reset link.
        </p>
        <form onSubmit={SendEmailHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              value={email.email}
              onChange={handleEmployeeSendMailInputChange}
              className="mt-1 px-4 py-2 w-full border border-blue-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForgetPasswordPage;