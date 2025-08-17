"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynceditresponsibility } from '@/store/Actions/studentAction'

const page = ({params}) => {

    const dispatch = useDispatch();
    const router = useRouter()
    const { student } = useSelector((state) => state.studentReducer);
    const respToEdit = student?.resume.responsibilities.find((resp) => resp.id === params.id);
    const [editresp, seteditresp] = useState({
  
        resp: respToEdit?.resp ||'',

    })

      // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        seteditresp({
            ...editresp,
            [name]: value,
        });
    };  
  const EditrespHandler = (e)=>{
    e.preventDefault();
    dispatch(asynceditresponsibility(params.id , editresp));
    router.push("/student/auth/resume")
  }
  return (
    <div className='container mt-5'>
            <form onSubmit={EditrespHandler} className='space-y-6'>
                <div>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                        Responsibility
                    </label>
                    <textarea
                        id='description'
                        name='resp'
                        rows='3'
                        value={editresp.resp}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                    >
                        Save
                    </button>
                    <button
                        type='button'
                        onClick={() => router.push('/student/auth/resume')}
                        className='bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-300'
                    >
                        Cancel
                    </button>
                </div>
            </form>
    </div>
  )
}

export default page