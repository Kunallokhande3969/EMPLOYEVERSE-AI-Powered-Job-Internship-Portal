"use client";
import { useDispatch, useSelector } from "react-redux";
import { asyncstudentforgetpassword } from "@/store/Actions/studentAction";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPasswordPage = () => {
  const { errors, isAuthenticated } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/student/dashboard");
    }
  }, [isAuthenticated, router]);

  // Error handling
  useEffect(() => {
    toast.dismiss();
    if (errors?.message) {
      // Skip showing "Please log in" message specifically
      if (!errors.message.includes("Please log in")) {
        toast.error(errors.message);
      }
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await dispatch(asyncstudentforgetpassword({ email }));
      
      if (result?.error) {
        // Skip showing if it's the login message
        if (!result.error.message?.includes("Please log in")) {
          toast.error(result.error.message);
        }
        return;
      }
      
      toast.success("Reset link sent to your email!");
      setTimeout(() => router.push("/student/forget/otp"), 2000);
    } catch (error) {
      if (!error.message?.includes("Please log in")) {
        toast.error(error.message || "Failed to send reset link");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80%] w-full pt-[10%] bg-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md bg-blue-600 text-white ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;