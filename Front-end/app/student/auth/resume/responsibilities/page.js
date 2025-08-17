"use client"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asysnaddresponsibility } from '@/store/Actions/studentAction';
import { useRouter } from 'next/navigation';

const page = () => {

    const dispatch = useDispatch();
    const router = useRouter()
    const [resp, setresp] = useState({

      resp : '',

    })
    const AddresponsibilityHandler = (e)=>{

        e.preventDefault();
        dispatch(asysnaddresponsibility(resp))
        router.push("/student/auth/resume")
    }


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setresp({
          ...resp,
          [name]: value,
      });
  };
  return (
    <div className='container mt-5'>
    <form onSubmit={AddresponsibilityHandler} className='space-y-6'>
    <div className='mb-4'>
 <label htmlFor='responsibility' className='block text-sm font-medium text-gray-700'>
     Responsibility
 </label>
 <textarea
     name='resp'
     value={resp.description}
     placeholder='Add your responsibility'
     onChange={handleInputChange}
     className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
 />
</div>
<div className='flex items-center justify-between'>
 <button
     type='submit'
     className='bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300'
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