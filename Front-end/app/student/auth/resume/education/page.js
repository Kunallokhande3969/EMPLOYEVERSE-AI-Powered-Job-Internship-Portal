  "use client"
  import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asysnaddeducation } from '@/store/Actions/studentAction';
import { useRouter } from 'next/navigation';

const EducationForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [educationData, setEducationData] = useState({
        college: '',
        startYear: '', // Updated to store the selected start year
        endYear: '',   // Updated to store the selected end year
        degree: '',
        stream: '',
        performanceScale: 'CGPA',
        performance: '',
    }); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEducationData({
            ...educationData,
            [name]: value,
        });
    };

    const handlePerformanceScaleChange = (e) => {
        const { value } = e.target;
        setEducationData({
            ...educationData,
            performanceScale: value,
            performance: '', // Clear performance value when scale changes
        });
    };

    const years = []; // Create an array to store the list of years
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 30; year--) {
        years.push(year.toString()); // Add years to the array
    }

    const AddEducationHandler = (e) => {
        e.preventDefault();
        dispatch(asysnaddeducation(educationData));
        router.push('/student/auth/resume');
    };

    return (
        <div className='container mt-5'>
           <form onSubmit={AddEducationHandler} className='space-y-6'>
    <div className='mb-4'>
        <label htmlFor='college' className='block text-sm font-medium text-gray-700'>
            College
        </label>
        <input
            type='text'
            name='college'
            value={educationData.college}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
    </div>
    <div className='mb-4'>
        <label htmlFor='startYear' className='block text-sm font-medium text-gray-700'>
            Start Year
        </label>
        <select
            name='startYear'
            value={educationData.startYear}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        >
            <option value=''>Select Start Year</option>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    </div>
    <div className='mb-4'>
        <label htmlFor='endYear' className='block text-sm font-medium text-gray-700'>
            End Year
        </label>
        <select
            name='endYear'
            value={educationData.endYear}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        >
            <option value=''>Select End Year</option>
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    </div>
    <div className='mb-4'>
        <label htmlFor='degree' className='block text-sm font-medium text-gray-700'>
            Degree
        </label>
        <input
            type='text'
            name='degree'
            value={educationData.degree}
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
            name='stream'
            value={educationData.stream}
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
            value={educationData.performanceScale}
            onChange={handlePerformanceScaleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        >
            <option value='CGPA'>CGPA</option>
            <option value='Percentage'>Percentage</option>
        </select>
    </div>
    {educationData.performanceScale === 'CGPA' ? (
        <div className='mb-4'>
            <label htmlFor='performance' className='block text-sm font-medium text-gray-700'>
                CGPA
            </label>
            <input
                type='text'
                name='performance'
                value={educationData.performance}
                onChange={handleInputChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
            />
        </div>
    ) : (
        <div className='mb-4'>
            <label htmlFor='performance' className='block text-sm font-medium text-gray-700'>
                Percentage
            </label>
            <input
                type='text'
                name='performance'
                value={educationData.performance}
                onChange={handleInputChange}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
            />
        </div>
    )}
    <div className='flex items-center justify-between'>
        <button
            type='submit'
            className='bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-300'
        >
            Add Education
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

export default EducationForm;
