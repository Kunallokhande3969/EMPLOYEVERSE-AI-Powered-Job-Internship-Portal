"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  FiCheckCircle,
  FiArrowRight,
  FiBriefcase,
  FiClock,
} from "react-icons/fi";
import {
  asyncapplyjobstudent,
  asyncapplyinternshipstudent,
} from "@/store/Actions/studentAction";

const Page = () => {
  const {
    jobs = [],
    internships = [],
    student,
  } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({});

  // Remove duplicates with safety checks
  const uniqueJobs = Array.isArray(jobs)
    ? jobs.filter(
        (job, index, self) => index === self.findIndex((j) => j._id === job._id)
      )
    : [];

  const uniqueInternships = Array.isArray(internships)
    ? internships.filter(
        (internship, index, self) =>
          index === self.findIndex((i) => i._id === internship._id)
      )
    : [];

  // Enhanced handlers with loading states
  const ApplyJobHandler = async (id) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    await dispatch(asyncapplyjobstudent(id));
    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  const ApplyInternshipHandler = async (id) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    await dispatch(asyncapplyinternshipstudent(id));
    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Jobs Section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-800">
            Available Jobs for{" "}
            <span className="text-blue-600">{student?.firstname}</span>
          </h2>
        </div>

        {uniqueJobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FiBriefcase className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No jobs available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.title}
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {job.jobtype}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FiBriefcase className="mr-2 text-gray-400" />
                      <span>Openings: {job.openings}</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Skills Required:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills?.split(",").map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600 line-clamp-3 text-sm">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      href={`/student/auth/readjob/${job._id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium group/link"
                    >
                      View Details
                      <FiArrowRight className="ml-1 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    {student && !job.students?.includes(student._id) ? (
                      <button
                        onClick={() => ApplyJobHandler(job._id)}
                        disabled={loading[job._id]}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          loading[job._id]
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white shadow-sm hover:shadow-md`}
                      >
                        {loading[job._id] ? "Applying..." : "Apply Now"}
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800 font-medium text-sm">
                        <FiCheckCircle className="mr-2" /> Applied
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Internships Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-10 bg-purple-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-800">
            Available Internships for{" "}
            <span className="text-purple-600">{student?.firstname}</span>
          </h2>
        </div>

        {uniqueInternships.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FiClock className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No internships available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueInternships.map((internship) => (
              <div
                key={internship._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {internship.profile}
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      {internship.internshiptype}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FiBriefcase className="mr-2 text-gray-400" />
                      <span>Openings: {internship.openings}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FiClock className="mr-2 text-gray-400" />
                      <span>Duration: {internship.duration}</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Skills Required:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills?.split(",").map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      href={`/student/auth/read/${internship._id}`}
                      className="text-purple-600 hover:text-purple-800 flex items-center text-sm font-medium group/link"
                    >
                      View Details
                      <FiArrowRight className="ml-1 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    {student && !internship.students?.includes(student._id) ? (
                      <button
                        onClick={() => ApplyInternshipHandler(internship._id)}
                        disabled={loading[internship._id]}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          loading[internship._id]
                            ? "bg-purple-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                        } text-white shadow-sm hover:shadow-md`}
                      >
                        {loading[internship._id] ? "Applying..." : "Apply Now"}
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800 font-medium text-sm">
                        <FiCheckCircle className="mr-2" /> Applied
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
