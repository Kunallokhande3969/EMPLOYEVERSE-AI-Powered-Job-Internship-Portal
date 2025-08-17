"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  asyncallinternships, 
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
      dispatch(asyncallinternships()); 
    }
  }, [isAuthenticated]);

  return children;
};
  
export default StudentAuth;
