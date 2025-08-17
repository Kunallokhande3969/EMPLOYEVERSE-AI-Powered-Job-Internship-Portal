"use client"
import React from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/store/store'
import { Provider } from 'react-redux'
const Wrapper = ({children}) => {
  return (
    <>
    <Provider store={store}>
    {children} <ToastContainer/>
    </Provider>
    </>
  )
}

export default Wrapper