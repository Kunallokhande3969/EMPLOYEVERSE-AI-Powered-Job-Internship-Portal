import axios from "@/utiles/axios";
import {
  addemploye,
  removeemploye,
  iserorr,
  removerorr,
  addjobs,
  addinternships,
} from "../Reducers/employeReducer";

// Safe error message helper
const getErrorMessage = (error, fallback = "Something went wrong") => {
  return error?.response?.data?.message || error?.message || fallback;
};

export const asynccurrentemploye = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employe/current");
    dispatch(addemploye(data));
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
  }
};

export const asynctemployesignup = (employe) => async (dispatch, getState) => {
  try {
    await axios.post("/employe/signup", employe);
    dispatch(asynccurrentemploye());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
  }
};

export const asynctemployesignin = (employe) => async (dispatch, getState) => {
  try {
    await axios.post("/employe/signin", employe);
    dispatch(asynccurrentemploye());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
  }
};

export const asynctemployesignout = () => async (dispatch, getState) => {
  try {
    await axios.get("/employe/signout");
    dispatch(removeemploye());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
  }
};

export const asynctemployeupdate = (employe) => async (dispatch, getState) => {
  try {
    const { _id } = getState().employeReducer.employe;
    await axios.post("/employe/update/" + _id, employe);
    dispatch(asynccurrentemploye());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
    console.log(error);
  }
};

export const asyncemployeorganizationLogo =
  (file) => async (dispatch, getState) => {
    try {
      const { _id } = getState().employeReducer.employe;
      const formData = new FormData();
      formData.append("organizationLogo", file); // <-- field name must match backend

      const { data } = await axios.post(`/employe/avatar/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      dispatch(asynccurrentemploye());
      return data;
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error, "Avatar upload failed")));
      throw error;
    }
  };

export const asyncemployeresetpassword =
  (password) => async (dispatch, getState) => {
    try {
      const { _id } = getState().employeReducer.employe;
      await axios.post("/employe/reset-password/" + _id, password);
      dispatch(asynccurrentemploye());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error)));
      console.log(error);
    }
  };

export const asyncemployeforgetpassword =
  (email) => async (dispatch, getState) => {
    try {
      await axios.post("/employe/send-mail/", email);
      dispatch(asynccurrentemploye());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error)));
      console.log(error);
    }
  };

export const asyncemployeotppassword = (pwd) => async (dispatch, getState) => {
  try {
    await axios.post("/employe/forget-link/", pwd);
    dispatch(asynccurrentemploye());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
    console.log(error);
  }
};

export const asyncalljobs = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employe/alljob/");
    dispatch(addjobs(data.job));
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
    console.log(error);
  }
};

export const asyncallinternships = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employe/allinternship/");
    dispatch(addinternships(data.internship));
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
    console.log(error);
  }
};

export const asyncapplyjobemploye = (id) => async (dispatch, getState) => {
  try {
    await axios.post("/employe/apply/job/" + id);
    dispatch(asynccurrentemploye());
    dispatch(asyncalljobs());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
    console.log(error);
  }
};

export const asyncapplyinternshipemploye =
  (id) => async (dispatch, getState) => {
    try {
      await axios.post("/employe/apply/internship/" + id);
      dispatch(asynccurrentemploye());
      dispatch(asyncallinternships());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error)));
      console.log(error);
    }
  };

export const asynccreatejobemploye = (job) => async (dispatch, getState) => {
  try {
    await axios.post("/employe/job/create/", job);
    dispatch(asynccurrentemploye());
  } catch (error) {
    dispatch(iserorr(getErrorMessage(error)));
    console.log(error);
  }
};

export const asynccreateinternshipemploye =
  (internship) => async (dispatch, getState) => {
    try {
      await axios.post("/employe/internship/create/", internship);
      dispatch(asynccurrentemploye());
    } catch (error) {
      dispatch(iserorr(getErrorMessage(error)));
      console.log(error);
    }
  };
