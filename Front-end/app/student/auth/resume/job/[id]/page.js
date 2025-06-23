"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynceditjob } from '@/store/Actions/studentAction'

const page = ({params}) => {

    const dispatch = useDispatch();
    const router = useRouter()
    const { student } = useSelector((state) => state.studentReducer);
    const jobToEdit = student?.resume.jobs.find((job) => job.id === params.id);
    const [editjob, seteditjob] = useState({
        profile : jobToEdit?.profile ||'',
        organization: jobToEdit?.organization ||'',
        location: jobToEdit?.location ||'',
        startDate:jobToEdit?.startDate ||'',
        endDate: jobToEdit?.endDate ||'',
        description: jobToEdit?.description ||'',

    })

      // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        seteditjob({
            ...editjob,
            [name]: value,
        });
    };  
  const EditjobHandler = (e)=>{
    e.preventDefault();
    dispatch(asynceditjob(params.id , editjob));
    router.push("/student/auth/resume")
  }
  return (
    <div className='container mt-5'>
            <form onSubmit={EditjobHandler} className='space-y-6'>
                <div>
                    <label htmlFor='profile' className='block text-sm font-medium text-gray-700'>
                        Profile
                    </label>
                    <input
                        type='text'
                        id='profile'
                        name='profile'
                        value={editjob.profile}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='organization' className='block text-sm font-medium text-gray-700'>
                        Organization
                    </label>
                    <input
                        type='text'
                        id='organization'
                        name='organization'
                        value={editjob.organization}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='location' className='block text-sm font-medium text-gray-700'>
                        Location
                    </label>
                    <input
                        type='text'
                        id='location'
                        name='location'
                        value={editjob.location}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='startDate' className='block text-sm font-medium text-gray-700'>
                        Start Date
                    </label>
                    <input
                        type='text'
                        id='startDate'
                        name='startDate'
                        value={editjob.startDate}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='endDate' className='block text-sm font-medium text-gray-700'>
                        End Date
                    </label>
                    <input
                        type='text'
                        id='endDate'
                        name='endDate'
                        value={editjob.endDate}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        rows='3'
                        value={editjob.description}
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