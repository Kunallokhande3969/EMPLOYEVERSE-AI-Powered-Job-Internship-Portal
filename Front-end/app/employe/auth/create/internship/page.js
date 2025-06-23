"use client";
import { asynccreateinternshipemploye } from "@/store/Actions/employeAction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateInternshipPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [internshipCreate, setInternshipCreate] = useState({
    profile: "",
    skills: "",
    internshiptype: "In office",
    openings: 0,
    duration: "",
    responsibility: "",
    stipend: {
      status: "Fixed",
    },
    salary: 0,
    perks: "",
    assessments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested field (stipend.status)
    if (name === "stipend.status") {
      setInternshipCreate((prev) => ({
        ...prev,
        stipend: {
          ...prev.stipend,
          status: value,
        },
      }));
    } else {
      setInternshipCreate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const CreateInternshipHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asynccreateinternshipemploye(internshipCreate));

      toast.success("Internship created successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      setTimeout(() => {
        router.push("/employe/auth/applied");
      }, 300);
    } catch (error) {
      toast.error("Something went wrong while creating the internship.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10 px-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Internship
        </h1>
        <form onSubmit={CreateInternshipHandler}>
          {/* Profile */}
          <div className="mb-6">
            <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
              Profile
            </label>
            <input
              type="text"
              id="profile"
              name="profile"
              value={internshipCreate.profile}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., Software Developer Intern"
              required
            />
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={internshipCreate.skills}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., JavaScript, React, Node.js"
              required
            />
          </div>

          {/* Internship Type */}
          <div className="mb-6">
            <label htmlFor="internshiptype" className="block text-sm font-medium text-gray-700">
              Internship Type
            </label>
            <select
              id="internshiptype"
              name="internshiptype"
              value={internshipCreate.internshiptype}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              required
            >
              <option value="In office">In office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Openings */}
          <div className="mb-6">
            <label htmlFor="openings" className="block text-sm font-medium text-gray-700">
              Openings
            </label>
            <input
              type="number"
              id="openings"
              name="openings"
              value={internshipCreate.openings}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., 5"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={internshipCreate.duration}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., 3 months"
              required
            />
          </div>

          {/* Responsibility */}
          <div className="mb-6">
            <label htmlFor="responsibility" className="block text-sm font-medium text-gray-700">
              Responsibility
            </label>
            <textarea
              id="responsibility"
              name="responsibility"
              value={internshipCreate.responsibility}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., Develop and maintain web applications"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Stipend Status */}
          <div className="mb-6">
            <label htmlFor="stipend-status" className="block text-sm font-medium text-gray-700">
              Stipend Status
            </label>
            <select
              id="stipend-status"
              name="stipend.status"
              value={internshipCreate.stipend.status}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              required
            >
              <option value="Fixed">Fixed</option>
              <option value="Negotiable">Negotiable</option>
              <option value="Performance Based">Performance Based</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          {/* Salary */}
          <div className="mb-6">
            <label htmlFor="stipend-amount" className="block text-sm font-medium text-gray-700">
              Stipend
            </label>
            <input
              type="number"
              id="stipend-amount"
              name="salary"
              value={internshipCreate.salary}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., 10000"
              required
            />
          </div>

          {/* Perks */}
          <div className="mb-6">
            <label htmlFor="perks" className="block text-sm font-medium text-gray-700">
              Perks
            </label>
            <input
              type="text"
              id="perks"
              name="perks"
              value={internshipCreate.perks}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., Certificate, Flexible Hours"
              required
            />
          </div>

          {/* Assessments */}
          <div className="mb-6">
            <label htmlFor="assessments" className="block text-sm font-medium text-gray-700">
              Assessments
            </label>
            <input
              type="text"
              id="assessments"
              name="assessments"
              value={internshipCreate.assessments}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
              placeholder="e.g., Coding Test, Interview"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none"
            >
              Create Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInternshipPage;
