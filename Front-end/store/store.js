import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './Reducers/studentReducer'
import employeReducer from './Reducers/employeReducer'



export const store = configureStore({
  reducer: {
    studentReducer,
    employeReducer,
  },
})