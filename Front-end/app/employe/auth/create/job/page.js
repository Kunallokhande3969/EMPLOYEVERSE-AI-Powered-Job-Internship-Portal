"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asynccreatejobemploye } from "@/store/Actions/employeAction";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJobPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [jobCreate, setJobCreate] = useState({
    title: "",
    skills: "",
    jobtype: "",
    openings: 0,
    description: "",
    preference: "",
    salary: 0,
    perks: "",
    assesments: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asynccreatejobemploye(jobCreate));

      toast.success("Job created successfully!", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setTimeout(() => {
        router.push("/employe/auth/applied");
      }, 300);
    } catch (error) {
      toast.error("Something went wrong while creating the job.", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobCreate({
      ...jobCreate,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobCreate.title}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter job title"
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Required Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={jobCreate.skills}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter required skills"
              required
            />
          </div>

          {/* Job Type */}
          <div>
            <label htmlFor="jobtype" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              id="jobtype"
              name="jobtype"
              value={jobCreate.jobtype}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select Job Type</option>
              <option value="In office">In office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Openings */}
          <div>
            <label htmlFor="openings" className="block text-sm font-medium text-gray-700">
              Number of Openings
            </label>
            <input
              type="number"
              id="openings"
              name="openings"
              value={jobCreate.openings}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter number of openings"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={jobCreate.description}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter job description"
              required
            />
          </div>

          {/* Preference */}
          <div>
            <label htmlFor="preference" className="block text-sm font-medium text-gray-700">
              Candidate Preference
            </label>
            <textarea
              id="preference"
              name="preference"
              value={jobCreate.preference}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter candidate preference"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary (in ₹)
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={jobCreate.salary}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter salary amount"
              required
            />
          </div>

          {/* Perks */}
          <div>
            <label htmlFor="perks" className="block text-sm font-medium text-gray-700">
              Perks
            </label>
            <textarea
              id="perks"
              name="perks"
              value={jobCreate.perks}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter perks"
              required
            />
          </div>

          {/* Assessments */}
          <div>
            <label htmlFor="assesments" className="block text-sm font-medium text-gray-700">
              Assessments
            </label>
            <textarea
              id="assesments"
              name="assesments"
              value={jobCreate.assesments}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter assessments"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 w-full text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition-all duration-200"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
