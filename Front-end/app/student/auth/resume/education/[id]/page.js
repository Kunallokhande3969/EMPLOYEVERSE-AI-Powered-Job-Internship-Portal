"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncediteducation } from '@/store/Actions/studentAction';

const EditEducationPage = ({ params }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { student } = useSelector((state) => state.studentReducer);

    // Find the education entry to edit based on its ID
    const educationToEdit = student?.resume.education.find((edu) => edu.id === params.id);

    // Initialize education data state with default values
    const [editedu, seteditedu] = useState({
        college: educationToEdit?.college || '',
        startYear: educationToEdit?.startYear || '',
        endYear: educationToEdit?.endYear || '',
        degree: educationToEdit?.degree || '',
        stream: educationToEdit?.stream || '',
        performanceScale: educationToEdit?.performanceScale || 'CGPA',
        performance: educationToEdit?.performance || '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        seteditedu({
            ...editedu,
            [name]: value,
        });
    };

    // Handle form submission
    const handleEditEducation = (e) => {
        e.preventDefault();
        // Send the updated education data to the server
        dispatch(asyncediteducation(params.id, editedu));
        // Redirect to the resume page
        router.push('/student/auth/resume');
    };

    return (
        <div className='container mt-5'>
          <form onSubmit={handleEditEducation} className='space-y-6'>
    <div className='mb-4'>
        <label htmlFor='college' className='block text-sm font-medium text-gray-700'>
            College
        </label>
        <input
            type='text'
            id='college'
            name='college'
            value={editedu.college}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
    </div>
    <div className='mb-4'>
        <label htmlFor='startYear' className='block text-sm font-medium text-gray-700'>
            Start Year
        </label>
        <input
            type='text'
            id='startYear'
            name='startYear'
            value={editedu.startYear}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
    </div>
    <div className='mb-4'>
        <label htmlFor='endYear' className='block text-sm font-medium text-gray-700'>
            End Year
        </label>
        <input
            type='text'
            id='endYear'
            name='endYear'
            value={editedu.endYear}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
    </div>
    <div className='mb-4'>
        <label htmlFor='degree' className='block text-sm font-medium text-gray-700'>
            Degree
        </label>
        <input
            type='text'
            id='degree'
            name='degree'
            value={editedu.degree}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
    </div>
    <div className='mb-4'>
        <label htmlFor='stream' className='block text-sm font-medium text-gray-700'>
            Stream
        </label>
        <input
            type='text'
            id='stream'
            name='stream'
            value={editedu.stream}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
    </div>
    <div className='mb-4'>
        <label htmlFor='performanceScale' className='block text-sm font-medium text-gray-700'>
            Performance Scale
        </label>
        <select
            name='performanceScale'
            value={editedu.performanceScale}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        >
            <option value='CGPA'>CGPA</option>
            <option value='Percentage'>Percentage</option>
        </select>
    </div>
    <div className='mb-4'>
        <label htmlFor='performance' className='block text-sm font-medium text-gray-700'>
            Performance
        </label>
        <input
            type='text'
            id='performance'
            name='performance'
            value={editedu.performance}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
    </div>
    <div className='flex items-center justify-between'>
        <button
            type='submit'
            className='bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
        >
            Edit Education
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
};

export default EditEducationPage;
