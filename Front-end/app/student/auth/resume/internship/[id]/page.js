"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynceditinternship } from '@/store/Actions/studentAction'

const page = ({params}) => {

    const dispatch = useDispatch();
    const router = useRouter()
    const { student } = useSelector((state) => state.studentReducer);
    const internshipToEdit = student?.resume.internship.find((internship) => internship.id === params.id);
    const [editinternship, seteditinternship] = useState({
        profile : internshipToEdit?.profile ||'',
        organization: internshipToEdit?.organization ||'',
        location: internshipToEdit?.location ||'',
        startDate:internshipToEdit?.startDate ||'',
        endDate: internshipToEdit?.endDate ||'',
        description: internshipToEdit?.description ||'',

    })

      // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        seteditinternship({
            ...editinternship,
            [name]: value,
        });
    };  
  const EditinternshipHandler = (e)=>{
    e.preventDefault();
    dispatch(asynceditinternship(params.id , editinternship));
    router.push("/student/auth/resume")
  }
  return (
    <div className='container mt-5'>
            <form onSubmit={EditinternshipHandler} className='space-y-6'>
                <div>
                    <label htmlFor='profile' className='block text-sm font-medium text-gray-700'>
                        Profile
                    </label>
                    <input
                        type='text'
                        id='profile'
                        name='profile'
                        value={editinternship.profile}
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
                        value={editinternship.organization}
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
                        value={editinternship.location}
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
                        value={editinternship.startDate}
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
                        value={editinternship.endDate}
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
                        value={editinternship.description}
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