"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asysnaddinternship } from '@/store/Actions/studentAction';
import { useRouter } from 'next/navigation';

const AddInternshipForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [internshipData, setInternshipData] = useState({
        profile: '',
        organization: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInternshipData({
            ...internshipData,
            [name]: value,
        });
    };

    const AddInternshipHandler = (e) => {
        e.preventDefault();
        dispatch(asysnaddinternship(internshipData));
        router.push('/student/auth/resume');
    };

    return (
        <div className='container mt-5'>
           <form onSubmit={AddInternshipHandler} className='space-y-6'>
                <div className='mb-4'>
                    <label htmlFor='profile' className='block text-sm font-medium text-gray-700'>
                        Profile
                    </label>
                    <input
                        type='text'
                        name='profile'
                        value={internshipData.profile}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='organization' className='block text-sm font-medium text-gray-700'>
                        Organization Name
                    </label>
                    <input
                        type='text'
                        name='organization'
                        value={internshipData.organization}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='location' className='block text-sm font-medium text-gray-700'>
                        Location
                    </label>
                    <input
                        type='text'
                        name='location'
                        value={internshipData.location}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='startDate' className='block text-sm font-medium text-gray-700'>
                        Start Date
                    </label>
                    <input
                        type='date'
                        name='startDate'
                        value={internshipData.startDate}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='endDate' className='block text-sm font-medium text-gray-700'>
                        End Date
                    </label>
                    <input
                        type='date'
                        name='endDate'
                        value={internshipData.endDate}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        name='description'
                        value={internshipData.description}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300'
                    >
                        Add Internship
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

export default AddInternshipForm;
