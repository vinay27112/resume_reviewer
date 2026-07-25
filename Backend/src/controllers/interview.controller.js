import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import {
  generateInterviewReport,
  generateResumePdf,
} from "../services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";

export const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;
  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(resumeFile.buffer),
  ).getText();
  const { jobDescription, selfDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await InterviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });
  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};

export const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;
  const interviewReport = await InterviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });
  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found" });
  }
  res.status(200).json({
    message: "Interview report retrieved successfully",
    interviewReport,
  });
};

export const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = await InterviewReportModel.find({
    user: req.user.id,
  })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );
  res.status(200).json({
    message: "Interview reports retrieved successfully",
    interviewReports,
  });
};

export const generateResumePdfController = async (req, res) => {
  const { interviewReportId } = req.params;
  const interviewReport =
    await InterviewReportModel.findById(interviewReportId);
  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found" });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(pdfBuffer);
};
