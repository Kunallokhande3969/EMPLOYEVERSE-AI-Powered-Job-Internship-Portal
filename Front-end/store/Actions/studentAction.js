import axios from "@/utiles/axios";
import {
  addstudent,
  removestudent,
  iserorr,
  removerorr,
  addjobs,
  addinternships,
} from "../Reducers/studentReducer";

// Safe error message helper
const getErrorMessage = (error, fallback = "Something went wrong") => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};

export const asynccurrentstudent = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student");
    dispatch(addstudent(data));
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Failed to fetch student")));
    if (process.env.NODE_ENV === 'development') {
      console.error("Student fetch error:", error);
    }
  }
};

export const asynctstudentsignup = (student) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/signup", student);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Signup failed")));
  }
};

export const asynctstudentsignin = (student) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/signin", student);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Signin failed")));
  }
};

export const asynctstudentsignout = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/student/signout");
    dispatch(removestudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Signout failed")));
  }
};

export const asynctstudentupdate = (updatedData) => async (dispatch, getState) => {
  try {
    const { _id } = getState().studentReducer.student;
    const { data } = await axios.post(`/student/update/${_id}`, updatedData);
    dispatch(asynccurrentstudent());
    if (typeof toast !== "undefined") toast.success("Profile updated successfully!");
  } catch (error) {
    if (typeof toast !== "undefined") toast.error(getErrorMessage(error, "Failed to update profile"));
  }
};

export const asyncstudentavatar = (avatar) => async (dispatch, getState) => {
  try {
    const { _id } = getState().studentReducer.student;
    const { data } = await axios.post('/student/avatar/' + _id, avatar);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Avatar upload failed")));
    console.log(error);
  }
};

export const asyncstudentresetpassword =
  (password) => async (dispatch, getState) => {
    try {
      const { _id } = getState().studentReducer.student;
      const { data } = await axios.post(
        "/student/reset-password/" + _id,
        password
      );
      dispatch(asynccurrentstudent());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error, "Password reset failed")));
      console.log(error);
    }
  };

export const asyncstudentforgetpassword =
  (email) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/student/send-mail/", email);
      dispatch(asynccurrentstudent());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error, "Forgot password failed")));
      console.log(error);
    }
  };

export const asyncstudentotppassword = (pwd) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/forget-link/", pwd);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "OTP password failed")));
    console.log(error);
  }
};

export const asyncalljobs = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/alljob/");
    dispatch(addjobs(data.job));
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Fetch jobs failed")));
    console.log(error);
  }
};

export const asyncallinternships = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/allinternship/");
    dispatch(addinternships(data.internship));
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Fetch internships failed")));
    console.log(error);
  }
};

export const asyncdeleteavatar = () => async (dispatch, getState) => {
  const { student } = getState().studentReducer;
  if (!student?._id) {
    throw new Error("Student not found");
  }
  try {
    await axios.delete(`/student/avatar/${student._id}`);
    dispatch(asynccurrentstudent());
    if (typeof toast !== "undefined") toast.success("Avatar deleted successfully!");
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Failed to delete avatar")));
    console.log(error);
  }
};

export const asyncapplyjobstudent = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/apply/job/" + id);
    dispatch(asynccurrentstudent());
    dispatch(asyncalljobs());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Apply job failed")));
    console.log(error);
  }
};

export const asyncapplyinternshipstudent =
  (id) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/student/apply/internship/" + id);
      dispatch(asynccurrentstudent());
      dispatch(asyncallinternships());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error, "Apply internship failed")));
      console.log(error);
    }
  };

export const asysnaddeducation = (edu) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-edu", edu);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add education failed")));
    console.log(error);
  }
};

export const asyncdeleteeducation = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-edu/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete education failed")));
    console.log(error);
  }
};

export const asyncediteducation = (id, edu) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/edit-edu/" + id, edu);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Edit education failed")));
    console.log(error);
  }
};


export const asysnaddjob = (job) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-job", job);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add job failed")));
    console.log(error);
  }
};

export const asyncdeletejob = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-job/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete job failed")));
    console.log(error);
  }
};

export const asynceditjob = (id, job) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/edit-job/" + id, job);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Edit job failed")));
    console.log(error);
  }
};

export const asysnaddinternship = (intern) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-intern", intern);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add internship failed")));
    console.log(error);
  }
};

export const asyncdeleteinternship = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-intern/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete internship failed")));
    console.log(error);
  }
};

export const asynceditinternship =
  (id, intern) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/resume/edit-intern/" + id, intern);
      dispatch(asynccurrentstudent());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error, "Edit internship failed")));
      console.log(error);
    }
  };

//================================ responbility resume ==========================

export const asysnaddresponsibility = (resp) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-resp", resp);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add responsibility failed")));
    console.log(error);
  }
};

export const asyncdeleteresponsebility = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-resp/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete responsibility failed")));
    console.log(error);
  }
};

export const asynceditresponsibility =
  (id, resp) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/resume/edit-resp/" + id, resp);
      dispatch(asynccurrentstudent());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error, "Edit responsibility failed")));
      console.log(error);
    }
  };

// ==========================course resume ===================

export const asysnaddcourse = (course) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-course", course);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add course failed")));
    console.log(error);
  }
};

export const asyncdeletecourse = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-course/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete course failed")));
    console.log(error);
  }
};

export const asynceditcourse = (id, course) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/edit-course/" + id, course);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Edit course failed")));
    console.log(error);
  }
};

// ========================project resume =====================================

export const asysnaddproject = (proj) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-proj", proj);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add project failed")));
    console.log(error);
  }
};

export const asyncdeleteproject = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-proj/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete project failed")));
    console.log(error);
  }
};

export const asynceditproject = (id, proj) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/edit-proj/" + id, proj);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Edit project failed")));
    console.log(error);
  }
};

// ================================ skills resume==========================

export const asysnaddskills = (skill) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-skill", skill);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add skill failed")));
    console.log(error);
  }
};

export const asyncdeleteskills = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-skill/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete skill failed")));
    console.log(error);
  }
};


export const asynceditskills = (id, skill) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/edit-skill/" + id, skill);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Edit skill failed")));
    console.log(error);
  }
};

//========================ACMP resume ==================

export const asysnaddacmp = (acmp) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/add-acmp", acmp);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Add ACMP failed")));
    console.log(error);
  }
};

export const asyncdeleteacmp = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/delete-acmp/" + id);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Delete ACMP failed")));
    console.log(error);
  }
};


export const asynceditacmp = (id, acmp) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/resume/edit-acmp/" + id, acmp);
    dispatch(asynccurrentstudent());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error, "Edit ACMP failed")));
    console.log(error);
  }
};