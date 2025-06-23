"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InternshipPage = ({ params }) => {
  const { employe } = useSelector((state) => state.employeReducer);
  const [singleinternship, setSingleinternship] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const internship = employe?.internships?.find((internship) => internship._id === params.id);
    setSingleinternship(internship);
  }, [employe, params.id]);

  if (!singleinternship) return <div className="container mx-auto py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button 
              onClick={() => router.back()}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
              </svg>
              Back to Internships
            </button>
          </li>
        </ol>
      </nav>

      {/* Internship Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {singleinternship.profile}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{singleinternship.internshiptype} Internship</span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {singleinternship.duration}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {singleinternship.stipend.status}: ₹{singleinternship.stipend.amount}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Openings: {singleinternship.openings}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* About the Company */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Company</h2>
              <div className="prose max-w-none text-gray-700">
                <p>We specialize in the design and delivery of training content in the BFSI domain. Our offerings range from ready products to customized training solutions. Organizations deploy our ready e-learning courses for internal compliance and domain training.</p>
              </div>
            </div>
          </div>

          {/* About the Internship */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Internship</h2>
              <div className="prose max-w-none text-gray-700">
                <ul className="list-disc pl-5 space-y-2">
                  {singleinternship.responsibility.split('\n').filter(item => item.trim()).map((item, index) => (
                    <li key={index}>{item.replace(/^\d+\.\s*/, '').trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Required */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {singleinternship.skills.split(',').map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Perks */}
          {singleinternship.perks && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Perks</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{singleinternship.perks}</p>
                </div>
              </div>
            </div>
          )}

          {/* Assessments */}
          {singleinternship.assesments && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assessments</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{singleinternship.assesments}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;