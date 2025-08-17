"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asysnaddacmp } from "@/store/Actions/studentAction";
import { useRouter } from "next/navigation";

const AddAccomplishmentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [newAccomplishment, setNewAccomplishment] = useState({
    name: "",
    description: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccomplishment({
      ...newAccomplishment,
      [name]: value,
    });
  };

  const AddAccomplishmentHandler = () => {
    dispatch(asysnaddacmp(newAccomplishment));
    router.push("/student/auth/resume");
  };

  return (
    <div className="container mt-5">
      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newAccomplishment.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={newAccomplishment.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={AddAccomplishmentHandler}
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push("/student/auth/resume")}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAccomplishmentPage;
