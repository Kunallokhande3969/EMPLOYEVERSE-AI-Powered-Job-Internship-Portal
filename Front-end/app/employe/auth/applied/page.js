"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  FiExternalLink,
  FiBriefcase,
  FiAward,
  FiDollarSign,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { MdWorkOff } from "react-icons/md";

const Page = () => {
  const { employe } = useSelector((state) => state.employeReducer);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Welcome, <span className="text-blue-600">{employe?.firstname}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage all your job postings and internships in one place
          </p>
        </motion.header>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center border-l-4 border-blue-500"
          >
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <FiBriefcase className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Jobs</h3>
              <p className="text-2xl font-bold text-gray-800">
                {employe?.jobs?.length || 0}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center border-l-4 border-green-500"
          >
            <div className="bg-green-100 p-3 rounded-xl mr-4">
              <FiAward className="text-green-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Total Internships
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {employe?.internships?.length || 0}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center border-l-4 border-purple-500"
          >
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <FiUser className="text-purple-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Active Since
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {new Date(employe?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Jobs Section */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiBriefcase className="mr-3 text-blue-500" size={28} />
              <span>
                Your <span className="text-blue-600">Job</span> Postings
              </span>
            </h2>
            <Link
              href="/employe/auth/create/job"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              Post New Job
            </Link>
          </div>

          {employe?.jobs?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {employe.jobs.map((job) => (
                <motion.div
                  key={job._id}
                  variants={item}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {job.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.jobtype === "Full-time"
                            ? "bg-blue-100 text-blue-800"
                            : job.jobtype === "Part-time"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {job.jobtype}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FiDollarSign className="mr-2 text-blue-500" />
                        <span>₹{job.salary}/month</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiUser className="mr-2 text-blue-500" />
                        <span>{job.openings} openings</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.split(",").map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/employe/auth/read/${job._id}`}
                      className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View Details <FiExternalLink className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={item}
              className="bg-white rounded-2xl shadow-sm p-8 text-center"
            >
              <MdWorkOff className="mx-auto text-5xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No Jobs Posted Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by posting your first job opportunity
              </p>
              <Link
                href="/employe/auth/create/job"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              > 
                Post a Job
              </Link>
            </motion.div>
          )}
        </motion.section>

        {/* Internships Section */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiAward className="mr-3 text-green-500" size={28} />
              <span>
                Your <span className="text-green-500">Internship</span> Programs
              </span>
            </h2>
            <Link
              href="/employe/auth/create/internship"
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              Create New Internship
            </Link>
          </div>

          {employe?.internships?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {employe.internships.map((internship) => (
                <motion.div
                  key={internship._id}
                  variants={item}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {internship.profile}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          internship.internshiptype === "Full-time"
                            ? "bg-blue-100 text-blue-800"
                            : internship.internshiptype === "Part-time"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {internship.internshiptype}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FiClock className="mr-2 text-green-500" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiDollarSign className="mr-2 text-green-500" />
                        <span>
                          ₹{internship.salary} ({internship.stipend.status})
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiUser className="mr-2 text-green-500" />
                        <span>{internship.openings} openings</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">
                        Perks & Benefits
                      </h4>
                      <p className="text-gray-700">{internship.perks}</p>
                    </div>

                    <Link
                      href={`/employe/auth/readintern/${internship._id}`}
                      className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      View Details <FiExternalLink className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={item}
              className="bg-white rounded-2xl shadow-sm p-8 text-center"
            >
              <MdWorkOff className="mx-auto text-5xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No Internships Created Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first internship opportunity for students
              </p>
              <Link
                href="/employe/auth/createintern"
                className="inline-block px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                Create Internship
              </Link>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Page;
