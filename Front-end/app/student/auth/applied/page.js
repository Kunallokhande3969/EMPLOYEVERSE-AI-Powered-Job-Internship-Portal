"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const Page = () => {
  const { student } = useSelector((state) => state.studentReducer);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Applications</h1>
        <p className="text-gray-600 mt-1">
          View all jobs and internships you've applied for
        </p>
      </div>

      {/* Applied Jobs Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Applied Jobs {student && `(${student.jobs?.length || 0})`}
          </h2>
        </div>

        {student?.jobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.jobs.map((job) => (
              <div
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                key={job._id}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {job.title}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Skills:</span>
                    <span className="text-gray-700">{job.skills}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Openings:</span>
                    <span className="text-gray-700">{job.openings}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Job Type:</span>
                    <span className="text-gray-700 capitalize">
                      {job.jobtype}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                <Link
                  href={`/student/auth/readjob/${job._id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">You haven't applied to any jobs yet</p>
          </div>
        )}
      </section>

      {/* Applied Internships Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Applied Internships{" "}
            {student && `(${student.internships?.length || 0})`}
          </h2>
        </div>

        {student?.internships?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.internships.map((internship) => (
              <div
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                key={internship._id}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {internship.profile}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Skills:</span>
                    <span className="text-gray-700">{internship.skills}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Openings:</span>
                    <span className="text-gray-700">{internship.openings}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Duration:</span>
                    <span className="text-gray-700">{internship.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">Stipend:</span>
                    <span className="text-gray-700">
                      {internship.stipend?.amount || "Not specified"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/student/auth/read/${internship._id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              You haven't applied to any internships yet
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
