"use client"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asysnaddskills } from '@/store/Actions/studentAction';
import { useRouter } from 'next/navigation';

const AddSkillsPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    // Initialize the skill state
    const [skill, setSkill] = useState({
        prog: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSkill({
            ...skill,
            [name]: value,
        });
    };

    const AddSkillsHandler = (e) => {
      e.preventDefault();
        dispatch(asysnaddskills(skill));
        router.push('/student/auth/resume');
    };

    return (
        <div className="container mt-5">
            <form onSubmit={AddSkillsHandler}>
                <div className="mb-4">
                    <label htmlFor="prog" className="block text-sm font-medium text-gray-700">
                        Skills (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="prog"
                        name="prog"
                        value={skill.prog}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300'
                    >
                        Add Skills
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

export default AddSkillsPage;
