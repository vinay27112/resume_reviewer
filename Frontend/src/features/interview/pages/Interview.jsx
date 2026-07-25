import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#3A3A3A] transition-colors">
      <div
        className="flex items-start gap-3 p-4 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="shrink-0 text-xs font-bold text-[#4F46E5] bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded px-1.5 py-0.5 mt-0.5">
          Q{index + 1}
        </span>
        <p className="flex-1 m-0 text-sm font-medium text-gray-200 leading-relaxed">
          {item.question}
        </p>
        <span
          className={`shrink-0 text-gray-500 transition-transform duration-200 mt-0.5 ${open ? "rotate-180 text-[#4F46E5]" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[#2A2A2A] pt-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded px-2 py-0.5 w-fit">
              Intention
            </span>
            <p className="m-0 text-sm text-gray-400 leading-relaxed">
              {item.intention}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-green-400 bg-green-400/10 border border-green-400/20 rounded px-2 py-0.5 w-fit">
              Model Answer
            </span>
            <p className="m-0 text-sm text-gray-400 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="flex flex-col gap-2 pl-14 relative pb-3 pt-3">
    {/* Timeline dot */}
    <div className="absolute left-5.25 top-5 w-3.5 h-3.5 rounded-full bg-[#1C1C1C] border-2 border-[#4F46E5]" />

    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-[#4F46E5] bg-[#4F46E5]/10 border border-[#4F46E5]/25 px-2 py-0.5 rounded-full">
        Day {day.day}
      </span>
      <h3 className="m-0 text-sm font-semibold text-gray-200">{day.focus}</h3>
    </div>

    <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
      {day.tasks.map((task, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-gray-400 leading-relaxed"
        >
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500 mt-2" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-200">
          Loading your interview plan...
        </h1>
      </main>
    );
  }

  const getScoreColor = () => {
    if (report.matchScore >= 80) return "border-green-400";
    if (report.matchScore >= 60) return "border-yellow-500";
    return "border-red-500";
  };

  const getScoreSubText = () => {
    if (report.matchScore >= 80) return "Strong match for this role";
    if (report.matchScore >= 60) return "Good potential for this role";
    return "Consider skill improvements";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-6 box-border">
      <div className="flex w-full max-w-7xl mx-auto bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl">
        {/* Left Nav */}
        <nav className="w-55 shrink-0 p-7 flex flex-col justify-between gap-1">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-3 mb-2">
              Sections
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-2 w-full px-3 py-2.5 bg-transparent border-none rounded-lg text-sm text-left cursor-pointer transition-colors ${
                  activeNav === item.id
                    ? "bg-[#4F46E5]/10 text-[#4F46E5]"
                    : "text-gray-500 hover:bg-[#2A2A2A] hover:text-gray-200"
                }`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="flex items-center shrink-0">
                  {React.cloneElement(item.icon, {
                    className:
                      activeNav === item.id
                        ? "stroke-[#4F46E5]"
                        : "stroke-current",
                  })}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              getResumePdf(interviewId);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#6366F1] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg
              height="0.8rem"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button>
        </nav>

        {/* Divider */}
        <div className="w-px bg-[#2A2A2A] shrink-0" />

        {/* Center Content */}
        <main className="flex-1 p-7 overflow-y-auto max-h-[calc(100vh-3rem)]">
          {activeNav === "technical" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 pb-4 mb-6 border-b border-[#2A2A2A]">
                <h2 className="text-lg font-bold text-gray-200 m-0">
                  Technical Questions
                </h2>
                <span className="text-xs text-gray-500 bg-[#2A2A2A] px-2 py-0.5 rounded-full border border-[#3A3A3A]">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 pb-4 mb-6 border-b border-[#2A2A2A]">
                <h2 className="text-lg font-bold text-gray-200 m-0">
                  Behavioral Questions
                </h2>
                <span className="text-xs text-gray-500 bg-[#2A2A2A] px-2 py-0.5 rounded-full border border-[#3A3A3A]">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section className="min-h-full">
              <div className="flex items-baseline gap-3 pb-4 mb-6 border-b border-[#2A2A2A]">
                <h2 className="text-lg font-bold text-gray-200 m-0">
                  Preparation Road Map
                </h2>
                <span className="text-xs text-gray-500 bg-[#2A2A2A] px-2 py-0.5 rounded-full border border-[#3A3A3A]">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>
              <div className="flex flex-col gap-0 relative">
                {/* Timeline line */}
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#4F46E5] to-[#4F46E5]/10 rounded" />
                <div>
                  {report.preparationPlan.map((day) => (
                    <RoadMapDay key={day.day} day={day} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Divider */}
        <div className="w-px bg-[#2A2A2A] shrink-0" />

        {/* Right Sidebar */}
        <aside className="w-60 shrink-0 p-7 flex flex-col gap-5">
          {/* Match Score */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 m-0 self-start">
              Match Score
            </p>
            <div
              className={`w-22.5 h-22.5 rounded-full flex flex-col items-center justify-center border-4 ${getScoreColor()}`}
            >
              <span className="text-2xl font-extrabold text-gray-200 leading-none">
                {report.matchScore}
              </span>
              <span className="text-xs text-gray-500 -mt-0.5">%</span>
            </div>
            <p
              className={`m-0 text-xs text-center ${
                report.matchScore >= 80
                  ? "text-green-400"
                  : report.matchScore >= 60
                    ? "text-yellow-500"
                    : "text-red-500"
              }`}
            >
              {getScoreSubText()}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#2A2A2A]" />

          {/* Skill Gaps */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 m-0">
              Skill Gaps
            </p>
            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`text-sm font-medium px-2.5 py-1.5 rounded-lg border cursor-default ${
                    gap.severity === "high"
                      ? "text-red-500 bg-red-500/10 border-red-500/25"
                      : gap.severity === "medium"
                        ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/25"
                        : "text-green-400 bg-green-400/10 border-green-400/25"
                  }`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
