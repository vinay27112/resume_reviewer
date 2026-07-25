import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  generateInterviewReportController,
  getAllInterviewReportsController,
  getInterviewReportByIdController,
  generateResumePdfController,
} from "../controllers/interview.controller.js";
import { upload } from "../middlewares/file.middleware.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterviewReportController,
);

interviewRouter.get(
  "/report/:interviewId",
  authUser,
  getInterviewReportByIdController,
);

interviewRouter.get("/", authUser, getAllInterviewReportsController);

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser,
  generateResumePdfController,
);

export default interviewRouter;
