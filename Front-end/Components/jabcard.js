import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md p-4 mb-4 rounded-md">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>
      <p className="mt-2 text-gray-700">{job.description}</p>
    </div>
  );
};

export default JobCard;