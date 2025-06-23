"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  asyncallinternships, // Correct import
  asyncalljobs,
} from "@/store/Actions/studentAction";

const StudentAuth = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/student/");
    } else {
      dispatch(asyncalljobs());
      dispatch(asyncallinternships()); // Fixed function call
    }
  }, [isAuthenticated]);

  return children;
};
  
export default StudentAuth;
