import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: null,
  jobs: null,
  internships: null,
  erorrs: [],
  isAuthenticated: false,
};

export const studentReducer = createSlice({
  name: "student",
  initialState,
  reducers: {
    addstudent: (state, action) => {
      state.student = action.payload;
      state.isAuthenticated = true;
    },
    removestudent: (state, action) => {
      state.student = null;
      state.isAuthenticated = false;
    },
    addjobs: (state, action) => {
      state.jobs = action.payload;
    },
    addinternships: (state, action) => {
      state.internships = action.payload;
    },
    iserorr: (state, action) => {
      state.erorrs.push(action.payload);
    },
    removerorr: (state, action) => {
      state.erorrs = [];
    },

    updateAvatarPreview: (state, action) => {
      if (state.student) {
        state.student.avatar = action.payload;
      }
    }
  },
});

export const {
  addstudent,
  removestudent,
  iserorr,
  removerorr,
  addjobs,
  addinternships,
  updateAvatarPreview, 
} = studentReducer.actions;

export default studentReducer.reducer;