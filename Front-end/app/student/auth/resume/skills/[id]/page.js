"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynceditskills } from '@/store/Actions/studentAction';

const EditSkillsPage = ({ params }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { student } = useSelector((state) => state.studentReducer);
    const skillToEdit = student?.resume.skills.find((skill) => skill.id === params.id);

    const [editSkill, setEditSkill] = useState({
        prog: skillToEdit?.prog || '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditSkill({
            ...editSkill,
            [name]: value,
        });
    };

    const EditSkillsHandler = (e) => {
        e.preventDefault();
        dispatch(asynceditskills(params.id, editSkill));
        router.push('/student/auth/resume');
    };

    return (
        <div className='container mt-5'>
            <form onSubmit={EditSkillsHandler} className='space-y-6'>
                <div>
                    <label htmlFor='prog' className='block text-sm font-medium text-gray-700'>
                        Skills
                    </label>
                    <input
                        type='text'
                        id='prog'
                        name='prog'
                        value={editSkill.prog}
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

export default EditSkillsPage;
