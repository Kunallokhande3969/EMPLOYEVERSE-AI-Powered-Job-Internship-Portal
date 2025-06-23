"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynceditacmp } from '@/store/Actions/studentAction'

const EditAccomplishmentPage = ({ params }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { student } = useSelector((state) => state.studentReducer);
    const accomplishmentToEdit = student?.resume.accomplishments.find((acmp) => acmp.id === params.id);
    const [editAccomplishment, setEditAccomplishment] = useState({
        name : accomplishmentToEdit?.name || '',
        description: accomplishmentToEdit?.description || '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditAccomplishment({
            ...editAccomplishment,
            [name]: value,
        });
    };

    const EditAccomplishmentHandler = (e) => {
        e.preventDefault();
        dispatch(asynceditacmp(params.id, editAccomplishment));
        router.push("/student/auth/resume");
    };

    return (
        <div className='container mt-5'>
            <form onSubmit={EditAccomplishmentHandler} className='space-y-6'>
                <div>
                    <label htmlFor='Name' className='block text-sm font-medium text-gray-700'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='Name'
                        name='name'
                        value={editAccomplishment.name}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='Description' className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        id='Description'
                        name='description'
                        rows='3'
                        value={editAccomplishment.description}
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
    );
};

export default EditAccomplishmentPage;
