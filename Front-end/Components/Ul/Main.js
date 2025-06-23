"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const imageData = [
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/int_opps-student.png.webp",
    alt: "Internship Opportunities",
    title: "Internship Opportunities",
    description: "Gain real-world experience with top companies",
    cta: "Find Internships",
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/exp_hiring-student.png.webp",
    alt: "Experienced Hiring",
    title: "Career Launcher",
    description: "Kickstart your professional journey with dream roles",
    cta: "Explore Jobs",
  },
  {
    src: "https://d3atms9ic4lahi.cloudfront.net/banner-images/home_new/pgc_banner-student.png.webp",
    alt: "PGC Banner",
    title: "Career Growth",
    description: "Upskill with our professional development resources",
    cta: "Learn More",
  },
];

const Main = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  const handleProtectedNav = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault(); // Prevent navigation
      if (!toast.isActive("auth-error")) {
        // Show error only if it's not already active
        toast.error("Please log in to access resources.", {
          toastId: "auth-error",
        });
      }
    } else {
      window.location.href = path; // Navigate if authenticated
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Make Your <span className="text-blue-600">Dream Career</span> A
          Reality
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover opportunities that align with your aspirations and skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {imageData.map((item, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96"
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Background Image */}
            <img
              src={item.src}
              alt={item.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                hoveredCard === idx ? "scale-110" : "scale-100"
              }`}
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <div
                className={`transition-all duration-500 ${
                  hoveredCard === idx
                    ? "translate-y-0"
                    : "translate-y-10 text-white"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="mb-4 opacity-90">{item.description}</p>
              </div>

              <button
                onClick={(e) => handleProtectedNav(e, "/student")}
                className={`inline-flex items-center font-semibold text-black border-2 border-white px-6 py-2 rounded-full transition-all duration-300 ${
                  hoveredCard === idx
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                } hover:bg-white hover:text-blue-600`}
              >
                {item.cta} <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={(e) => handleProtectedNav(e, "/student")}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Explore All Opportunities <FiArrowRight className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default Main;
