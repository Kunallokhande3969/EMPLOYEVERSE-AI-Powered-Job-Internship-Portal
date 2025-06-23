"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asysnaddproject } from '@/store/Actions/studentAction';
import { useRouter } from 'next/navigation';

const AddProjectForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [projectData, setProjectData] = useState({
        title: '',
        startMonth: '',
        endMonth: '',
        description: '',
        projectLink: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value,
        });
    };

    const AddProjectHandler = (e) => {
        e.preventDefault();
        dispatch(asysnaddproject(projectData));
        router.push('/student/auth/resume');
    };

    return (
        <div className='container mt-5'>
            <form onSubmit={AddProjectHandler} className='space-y-6'>
                <div>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={projectData.title}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='startMonth' className='block text-sm font-medium text-gray-700'>
                        Start Month
                    </label>
                    <input
                        type='text'
                        id='startMonth'
                        name='startMonth'
                        value={projectData.startMonth}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='endMonth' className='block text-sm font-medium text-gray-700'>
                        End Month
                    </label>
                    <input
                        type='text'
                        id='endMonth'
                        name='endMonth'
                        value={projectData.endMonth}
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
                        value={projectData.description}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='projectLink' className='block text-sm font-medium text-gray-700'>
                        Project Link (Optional)
                    </label>
                    <input
                        type='text'
                        id='projectLink'
                        name='projectLink'
                        value={projectData.projectLink}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300'
                    >
                        Add Project
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

export default AddProjectForm;
