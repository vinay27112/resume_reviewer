import { use, useContext, useEffect } from "react";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdf,
} from "../services/interview.api";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router-dom";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    selfDescription,
    jobDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let data = null;
    try {
      data = await generateInterviewReport({
        selfDescription,
        jobDescription,
        resumeFile,
      });
      setReport(data.interviewReport);
    } catch (error) {
      console.error("Error generating interview report:", error);
    } finally {
      setLoading(false);
    }
    return data.interviewReport;
  };

  const getReportById = async (reportId) => {
    setLoading(true);
    let data = null;
    try {
      data = await getInterviewReportById(reportId);
      setReport(data.interviewReport);
    } catch (error) {
      console.error("Error fetching interview report:", error);
    } finally {
      setLoading(false);
    }
    return data.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);
    let data = null;
    try {
      data = await getAllInterviewReports();
      setReports(data.interviewReports);
    } catch (error) {
      console.error("Error fetching interview reports:", error);
    } finally {
      setLoading(false);
    }
    return data.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
