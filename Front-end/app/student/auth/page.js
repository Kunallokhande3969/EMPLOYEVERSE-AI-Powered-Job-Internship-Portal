"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  asyncapplyjobstudent,
  asyncapplyinternshipstudent,
} from "@/store/Actions/studentAction";

const Page = () => {
  const { jobs, internships, student } = useSelector(
    (state) => state.studentReducer
  );
  const dispatch = useDispatch();

  const ApplyJobHandler = (id) => {
    dispatch(asyncapplyjobstudent(id));
  };

  const ApplyInternshipHandler = (id) => {
    dispatch(asyncapplyinternshipstudent(id));
  };

  useEffect(() => {}, [student]);

  return (
    <div className="container mt-5 mb-5">
      <h4>All Available Jobs For {student && student.firstname}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {jobs &&
          jobs.map((j) => (
            <div className="bg-white p-4 rounded-md shadow-md" key={j._id}>
              <h2 className="text-xl font-semibold">Title -{j.title}</h2>
              <p className="text-gray-600">
                <b>Skills</b> {j.skills}
              </p>
              <p className="text-gray-600">
                <b>JobType</b> {j.jobtype}
              </p>
              <p className="text-gray-600">
                <b>Openings</b>:{j.openings}
              </p>
              <p className="text-gray-600">
                <b>Descreption</b> {j.description}
              </p>
              <Link
                className=" fs-sm no-underline me-4"
                href={`/student/auth/readjob/${j._id}`}
              >
                View Details{">"}
              </Link>
              {!j.students.includes(student && student._id) ? (
                <button
                  onClick={() => ApplyJobHandler(j._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Apply Job
                </button>
              ) : (
                <h5 className="inline-block mt-1 px-3 py-2  bg-blue-400 text-white border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  Applied
                </h5>
              )}
            </div>
          ))}
      </div>

      <h4>All Available Internships For {student && student.firstname}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {internships &&
          internships.map((i) => (
            <div className="bg-white p-4 rounded-md shadow-md" key={i._id}>
              <h2 className="text-xl font-semibold">Profile - {i.profile}</h2>
              <p className="text-gray-600">
                <b>Skills</b> : {i.skills}
              </p>
              <p className="text-gray-600">
                <b>Type of Internship </b>:{i.internshiptype}
              </p>
              <p className="text-gray-600">
                <b>Openings</b>:{i.openings}
              </p>
              <p className="text-gray-600">
                <b>Duration</b> : {i.duration}
              </p>
              {/* <p className="text-gray-600"><b>Responsibility</b> : {i.responsibility}</p> */}
              {/* <p className="text-gray-600"><b>Stipend</b>: {i.stipend.status}</p>
              <p className="text-gray-600"><b>Stipend</b>: {i.stipend.amount}</p>
              <p className="text-gray-600"><b>Perks</b>: {i.perks}</p>
              <p className="text-gray-600"><b>Assesment</b>: {i.assesments}</p> */}
              <Link
                className="fs-sm no-underline me-4"
                href={`/student/auth/read/${i._id}`}
              >
                View Details{">"}
              </Link>
              {!i.students.includes(student && student._id) ? (
                <button
                  onClick={() => ApplyInternshipHandler(i._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Apply Internship
                </button>
              ) : (
                <h5 className="inline-block mt-1 px-3 py-2  text-white border rounded-md shadow-sm focus:ring-blue-500 bg-blue-400 focus:border-blue-500 sm:text-sm">
                  Applied
                </h5>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
