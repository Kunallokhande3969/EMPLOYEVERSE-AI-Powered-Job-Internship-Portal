"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import {
  asyncdeleteeducation,
  asyncdeletejob,
  asyncdeleteinternship,
  asyncdeleteresponsebility,
  asyncdeletecourse,
  asyncdeleteproject,
  asyncdeleteskills,
  asyncdeleteacmp,
} from "@/store/Actions/studentAction";

const ResumePage = () => {
  const { student } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const resumeRef = useRef();
  const previewResumeRef = useRef();
  const [showPreview, setShowPreview] = useState(false);

  // Delete handlers
  const DeleteHandler = (id) => dispatch(asyncdeleteeducation(id));
  const DeleteJobHandler = (id) => dispatch(asyncdeletejob(id));
  const DeleteInternshipHandler = (id) => dispatch(asyncdeleteinternship(id));
  const DeleteResponsibilityHandler = (id) =>
    dispatch(asyncdeleteresponsebility(id));
  const DeleteCoursesHandler = (id) => dispatch(asyncdeletecourse(id));
  const DeleteProjectHandler = (id) => dispatch(asyncdeleteproject(id));
  const DeleteskillsHandler = (id) => dispatch(asyncdeleteskills(id));
  const DeleteaccomplishmentsHandler = (id) => dispatch(asyncdeleteacmp(id));

  // PDF download using jsPDF
  const generatePDF = (ref, isPreview = false) => {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    // Add content to PDF
    doc.html(ref.current, {
      callback: function (doc) {
        doc.save(`${student?.firstname}_${student?.lastname}_Resume.pdf`);
      },
      margin: [10, 10, 10, 10],
      autoPaging: "text",
      width: 190, // A4 width in mm (210 - 10mm margins each side)
      windowWidth: ref.current.scrollWidth,
    });
  };

  const handleDownloadEditPDF = () => generatePDF(resumeRef);
  const handleDownloadPreviewPDF = () => generatePDF(previewResumeRef, true);

  // Professional Resume Preview Component
  const ProfessionalResumePreview = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-6" ref={previewResumeRef}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {student?.firstname} {student?.lastname}
            </h1>
            <p className="text-gray-600">{student?.email}</p>
            <div className="border-t border-gray-300 my-4"></div>
          </div>

          {/* Education */}
          {student?.resume.education?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">
                EDUCATION
              </h2>
              {student.resume.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {edu.degree} in {edu.stream}
                    </h3>
                    <p className="text-gray-600">
                      {edu.startYear} - {edu.endYear}
                    </p>
                  </div>
                  <p className="text-gray-700">{edu.college}</p>
                  <p className="text-sm text-gray-600">
                    {edu.performanceScale}: {edu.performance}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {(student?.resume.jobs?.length > 0 ||
            student?.resume.internship?.length > 0) && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">
                EXPERIENCE
              </h2>

              {/* Jobs */}
              {student.resume.jobs.map((job) => (
                <div key={job.id} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {job.profile} at {job.organization}
                    </h3>
                    <p className="text-gray-600">
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="mt-2 text-gray-700">{job.description}</p>
                </div>
              ))}

              {/* Internships */}
              {student.resume.internship.map((intern) => (
                <div key={intern.id} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {intern.profile} at {intern.organization}
                    </h3>
                    <p className="text-gray-600">
                      {intern.startDate} - {intern.endDate}
                    </p>
                  </div>
                  <p className="text-gray-600">{intern.location}</p>
                  <p className="mt-2 text-gray-700">{intern.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {student?.resume.project?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">
                PROJECTS
              </h2>
              {student.resume.project.map((proj) => (
                <div key={proj.id} className="mb-4">
                  <h3 className="font-semibold">{proj.title}</h3>
                  <p className="text-gray-600">
                    {proj.startMonth} - {proj.endMonth}
                  </p>
                  <p className="mt-2 text-gray-700">{proj.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {student?.resume.skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {student.resume.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.prog}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>Generated by CareerHub</p>
          </div>
        </div>

        {/* Preview Actions */}
        <div className="bg-gray-100 p-4 flex justify-end space-x-4 no-print">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Close
          </button>
          <button
            onClick={handleDownloadPreviewPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {student?.firstname} {student?.lastname}
        </h1>
        <p className="text-gray-600">{student?.email}</p>
        <hr className="my-4 border-gray-300" />
      </div>

      {/* Resume Sections */}
      <div ref={resumeRef}>
        {/* Education */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Education</h2>
            <Link
              href="/student/auth/resume/education"
              className="  text-blue-500 px-4 py-2 rounded-md text-sm"
            >
              Add Education
            </Link>
          </div>

          {student?.resume.education?.length > 0 ? (
            student.resume.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {edu.degree} in {edu.stream}
                    </h3>
                    <p className="text-gray-600">{edu.college}</p>
                    <p className="text-gray-500">
                      {edu.startYear} - {edu.endYear} | {edu.performanceScale}:{" "}
                      {edu.performance}
                    </p>
                  </div>
                  <div className="edit-delete-btns space-x-2">
                    <Link
                      href={`/student/auth/resume/education/${edu.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteHandler(edu.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No education added yet</p>
          )}
        </section>

        {/* Jobs */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Work Experience
            </h2>
            <Link
              href="/student/auth/resume/job"
              className="  text-blue-500 px-4 py-2 rounded-md text-sm"
            >
              Add Job
            </Link>
          </div>

          {student?.resume.jobs?.length > 0 ? (
            student.resume.jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{job.profile}</h3>
                    <p className="text-gray-600">
                      {job.organization}, {job.location}
                    </p>
                    <p className="text-gray-500">
                      {job.startDate} - {job.endDate}
                    </p>
                    <p className="mt-2 text-gray-700">{job.description}</p>
                  </div>
                  <div className="edit-delete-btns space-x-2">
                    <Link
                      href={`/student/auth/resume/job/${job.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteJobHandler(job.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No work experience added yet</p>
          )}
        </section>

        {/* Internships */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Internships
            </h2>
            <Link
              href="/student/auth/resume/internship"
              className="  text-blue-500 px-4 py-2 rounded-md text-sm"
            >
              Add Internship
            </Link>
          </div>

          {student?.resume.internship?.length > 0 ? (
            student.resume.internship.map((intern) => (
              <div
                key={intern.id}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{intern.profile}</h3>
                    <p className="text-gray-600">
                      {intern.organization}, {intern.location}
                    </p>
                    <p className="text-gray-500">
                      {intern.startDate} - {intern.endDate}
                    </p>
                    <p className="mt-2 text-gray-700">{intern.description}</p>
                  </div>
                  <div className="edit-delete-btns space-x-2">
                    <Link
                      href={`/student/auth/resume/internship/${intern.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteInternshipHandler(intern.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No internships added yet</p>
          )}
        </section>

        {/* Projects */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Projects</h2>
            <Link
              href="/student/auth/resume/project"
              className="  text-blue-500 px-4 py-2 rounded-md text-sm"
            >
              Add Project
            </Link>
          </div>

          {student?.resume.project?.length > 0 ? (
            student.resume.project.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{proj.title}</h3>
                    <p className="text-gray-500">
                      {proj.startMonth} - {proj.endMonth}
                    </p>
                    <p className="mt-2 text-gray-700">{proj.description}</p>
                  </div>
                  <div className="edit-delete-btns space-x-2">
                    <Link
                      href={`/student/auth/resume/project/${proj.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteProjectHandler(proj.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects added yet</p>
          )}
        </section>

        {/* Skills */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Skills</h2>
            <Link
              href="/student/auth/resume/skills"
              className="  text-blue-500 px-4 py-2 rounded-md text-sm"
            >
              Add Skill
            </Link>
          </div>

          {student?.resume.skills?.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap gap-2">
                {student.resume.skills.map((skill) => (
                  <div key={skill.id} className="relative group">
                    <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full inline-flex items-center">
                      {skill.prog}
                      <button
                        onClick={() => DeleteskillsHandler(skill.id)}
                        className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No skills added yet</p>
          )}
        </section>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-4 right-4 mx-[35%] flex space-x-4 bg-white p-4 rounded-lg shadow-lg">
        <button
          onClick={() => setShowPreview(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
        >
          Preview Resume
        </button>
        <button
          onClick={handleDownloadEditPDF}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
        >
          Download PDF  
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && <ProfessionalResumePreview />}
    </div>
  );
};

export default ResumePage;
