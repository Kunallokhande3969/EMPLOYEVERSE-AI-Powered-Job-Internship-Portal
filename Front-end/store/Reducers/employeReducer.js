import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
    employe : null,
    jobs : null,
    internships : null,
    erorrs : [],
    isAuthenticated : false

}
export const employeReducer = createSlice({
  name: 'employe',
  initialState,
  reducers: {

    addemploye : (state , action)=>{

        state.employe = action.payload;
        state.isAuthenticated = true;
    },
    removeemploye :(state , action)=>{

            state.employe = null;
            state.isAuthenticated = false;
    },
    addjobs : (state , action)=>{

      state.jobs = action.payload;
  },
  addinternships : (state , action)=>{

    state.internships = action.payload;
  },
    iserorr : (state, action)=>{

        state.erorrs.push(action.payload);  

    },
    removerorr: (state , action)=>{
        state.erorrs = [];
    },

  },
})

export const { addemploye, removeemploye, iserorr , removerorr , addjobs , addinternships } = employeReducer.actions
export default employeReducer.reducer