"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynceditproject } from '@/store/Actions/studentAction'

const EditProjectPage = ({ params }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { student } = useSelector((state) => state.studentReducer);
    const projectToEdit = student?.resume.project.find((project) => project.id === params.id);
    
    // Initialize the edit project state with the existing project data
    const [editProject, setEditProject] = useState({
        title: projectToEdit?.title || '',
        startMonth: projectToEdit?.startMonth || '',
        endMonth: projectToEdit?.endMonth || '',
        description: projectToEdit?.description || '',
        projectLink: projectToEdit?.projectLink || '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProject({
            ...editProject,
            [name]: value,
        });
    };

    const EditProjectHandler = (e) => {
        e.preventDefault();
        dispatch(asynceditproject(params.id, editProject));
        router.push("/student/auth/resume");
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={EditProjectHandler} className='space-y-6'>
                <div>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={editProject.title}
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
                        value={editProject.startMonth}
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
                        value={editProject.endMonth}
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
                        value={editProject.description}
                        onChange={handleInputChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div>
                    <label htmlFor='projectLink' className='block text-sm font-medium text-gray-700'>
                        Project Link
                    </label>
                    <input
                        type='text'
                        id='projectLink'
                        name='projectLink'
                        value={editProject.projectLink}
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

export default EditProjectPage;
