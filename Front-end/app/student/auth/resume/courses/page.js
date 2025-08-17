"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asysnaddcourse } from '@/store/Actions/studentAction';
import { useRouter } from 'next/navigation';

const AddCoursePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [courseData, setCourseData] = useState({
        Name: '',
        Organization: '',
        // Online: false,
        Location: '',
        StartDate: '',
        EndDate: '',
        Description: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setCourseData({
            ...courseData,
            [name]: newValue,
        });
    };

    const AddCourseHandler = (e) => {
        e.preventDefault();
        dispatch(asysnaddcourse(courseData));
        router.push("/student/auth/resume");
    };

    return (
        <div className='container mt-5'>
            <form onSubmit={AddCourseHandler} className='space-y-6'>
                <div className='mb-4'>
                    <label htmlFor='Name' className='block text-sm font-medium text-gray-700'>
                        Training Program
                    </label>
                    <input
                        type='text'
                        name='Name'
                        value={courseData.Name}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='Organization' className='block text-sm font-medium text-gray-700'>
                        Organization
                    </label>
                    <input
                        type='text'
                        name='Organization'
                        value={courseData.Organization}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
             </div>
                  {/*  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                        Online
                    </label>
                    <input
                        type='checkbox'
                        name='Online'
                        checked={courseData.Online}
                        onChange={handleInputChange}
                        className='mt-1'
                    />
                </div> */}
                <div className='mb-4'>
                    <label htmlFor='Location' className='block text-sm font-medium text-gray-700'>
                        Location
                    </label>
                    <input
                        type='text'
                        name='Location'
                        value={courseData.Location}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='StartDate' className='block text-sm font-medium text-gray-700'>
                        Start Date
                    </label>
                    <input
                        type='date'
                        name='StartDate'
                        value={courseData.StartDate}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='EndDate' className='block text-sm font-medium text-gray-700'>
                        End Date
                    </label>
                    <input
                        type='date'
                        name='EndDate'
                        value={courseData.EndDate}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='Description' className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        name='Description'
                        value={courseData.Description}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300'
                    >
                        Add Course
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
    );
}

export default AddCoursePage;
