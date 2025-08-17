"use client"
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  asynceditcourse } from '@/store/Actions/studentAction'

const EditCoursePage = ({ params }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { student } = useSelector((state) => state.studentReducer);

    const courseToEdit = student?.resume.courses.find((course) => course.id === params.id);

    const [editCourse, setEditCourse] = useState({
        Name: courseToEdit?.Name || '',
        Organization: courseToEdit?.Organization || '',
        // Online: courseToEdit?.Online || false,
        Location: courseToEdit?.Location || '',
        StartDate: courseToEdit?.StartDate || '',
        EndDate: courseToEdit?.EndDate || '',
        Description: courseToEdit?.Description || '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEditCourse({
            ...editCourse,
            [name]: newValue,
        });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(asynceditcourse(params.id, editCourse));
        router.push("/student/auth/resume");
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={handleFormSubmit} className='space-y-6'>
                <div>
                    <label htmlFor='Name' className='block text-sm font-medium text-gray-700'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='Name'
                        name='Name'
                        value={editCourse.Name}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='Organization' className='block text-sm font-medium text-gray-700'>
                        Organization
                    </label>
                    <input
                        type='text'
                        id='Organization'
                        name='Organization'
                        value={editCourse.Organization}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                {/* <div>
                    <label htmlFor='Online' className='block text-sm font-medium text-gray-700'>
                        Online
                    </label>
                    <input
                        type='checkbox'
                        id='Online'
                        name='Online'
                        checked={editCourse.Online}
                        onChange={handleInputChange}
                        className='mt-1 p-2 border border-gray-300 rounded-md shadow-sm'
                    />
                </div> */}
                <div>
                    <label htmlFor='Location' className='block text-sm font-medium text-gray-700'>
                        Location
                    </label>
                    <input
                        type='text'
                        id='Location'
                        name='Location'
                        value={editCourse.Location}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='StartDate' className='block text-sm font-medium text-gray-700'>
                        Start Date
                    </label>
                    <input
                        type='date'
                        id='StartDate'
                        name='StartDate'
                        value={editCourse.StartDate}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='EndDate' className='block text-sm font-medium text-gray-700'>
                        End Date
                    </label>
                    <input
                        type='date'
                        id='EndDate'
                        name='EndDate'
                        value={editCourse.EndDate}
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
                        name='Description'
                        rows='3'
                        value={editCourse.Description}
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

export default EditCoursePage;
