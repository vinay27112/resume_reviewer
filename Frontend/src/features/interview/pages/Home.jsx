import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`); // Navigate to the report page after generation
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707.707M16.95 7.05l-.707-.707M4.222 4.222l-.707-.707M18.364 5.636l-.707-.707M5.636 18.364l-.707-.707"
            />
          </svg>
          <p className="text-sm text-slate-500">Generating your report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 mb-3">
            <span className="w-1 h-1 rounded-full bg-indigo-600"></span>
            <span>AI-POWERED ANALYSIS</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
            Interview Report Generator
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            Upload candidate details for comprehensive AI-driven interview
            insights
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-slate-100">
            <div className="h-full w-1/3 bg-linear-to-r from-indigo-500 to-indigo-400"></div>
          </div>

          <div className="p-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Job Description */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">
                      Job Description
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        Required
                      </span>
                    </label>
                    <span className="text-xs text-slate-400">
                      Max 5000 chars
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-100 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200"></div>
                    <textarea
                      onChange={(e) => setJobDescription(e.target.value)}
                      value={jobDescription}
                      name="jobDescription"
                      id="jobDescription"
                      placeholder="Paste the complete job description including requirements and responsibilities..."
                      rows="8"
                      className="relative w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                    ></textarea>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-slate-400">0/5000</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500">
                      Experience Level
                    </div>
                    <div className="text-sm font-medium text-slate-700 mt-1">
                      Senior Level
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500">Job Type</div>
                    <div className="text-sm font-medium text-slate-700 mt-1">
                      Full-time
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Candidate Info */}
              <div className="space-y-6">
                {/* Resume Upload */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">
                      Resume/CV
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        PDF only
                      </span>
                    </label>
                    <span className="text-xs text-slate-400">Max 10MB</span>
                  </div>
                  <input
                    ref={resumeInputRef}
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className="flex flex-col items-center justify-center w-full h-32 px-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                  >
                    <svg
                      className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors mt-2">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      PDF up to 10MB
                    </span>
                  </label>
                </div>

                {/* Self Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">
                      Self Description
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        Optional
                      </span>
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      onChange={(e) => setSelfDescription(e.target.value)}
                      value={selfDescription}
                      name="selfDescription"
                      id="selfDescription"
                      placeholder="Share candidate's background, key achievements, and career aspirations..."
                      rows="5"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                    ></textarea>
                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-full">
                        ✨ AI suggestions available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Preview */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-700">
                    Analysis will include
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                      Skills Assessment
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                      Experience Mapping
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                      Gap Analysis
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                      Interview Questions
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                      Red Flags
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear all
              </button>

              <div className="flex gap-3">
                <button className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Save Draft
                </button>
                <button
                  className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow transition-all flex items-center gap-2"
                  onClick={handleGenerateReport}
                >
                  Generate Report
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-9 00 mb-4">
            Recent Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, index) => (
              <Link to={`/interview/${report._id}`}>
                <div
                  key={index}
                  className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#3A3A3A] transition-colors"
                >
                  <h4 className="text-md font-bold text-gray-200">
                    {report.title}
                  </h4>
                  <p className="text-sm text-gray-400 mt-2">
                    Match Score:
                    {report.matchScore}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              Secure upload
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              AI-powered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              Confidential
            </span>
          </div>
          <span>© 2024 InterviewAI</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
