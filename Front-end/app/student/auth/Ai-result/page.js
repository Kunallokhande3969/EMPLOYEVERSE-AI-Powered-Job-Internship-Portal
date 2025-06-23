
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function AIResultPage() {
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resultData = sessionStorage.getItem("resumeAnalysisResult");

    if (!resultData) {
      alert("Please upload your resume first to see results");
      router.push("/");
      return;
    }

    try {
      const parsedData = JSON.parse(resultData);

      console.log("Parsed analysis data:", parsedData);

      if (!parsedData.result || parsedData.result.length < 20) {
        throw new Error("No proper analysis results found");
      }

      setAnalysisData(parsedData);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to load analysis results. Please try again.");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your results...</p>
        </div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gray-100 py-8">
    <Head>
      <title>{analysisData?.jobTitle || "Job"} Analysis</title>
    </Head>

    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
      
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {analysisData?.jobTitle || "Job/Internship"}
            </h1>

          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Comprehensive Analysis
            </h2>

            {analysisData?.result ? (
              <div className="bg-blue-50 text-semibold p-4 rounded-md border border-blue-100 whitespace-pre-line">
                {analysisData.result}
                {analysisData.result.length < 20 && (
                  <div className="mt-4 text-red-500">
                    Note: The analysis appears incomplete. Please try again or contact support.
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
                No analysis content was found. Please re-upload your resume.
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/student/auth")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
