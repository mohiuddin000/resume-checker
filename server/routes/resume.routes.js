import express from "express";

import upload from "../config/multer.js";
import { protect } from "../middleware/auth.middleware.js";
import {
    deleteResume,
    getResumeById,
    getResumes,
    uploadResume,
} from "../controllers/resume.controller.js";

const resumeRouter = express.Router();

resumeRouter.post("/upload", protect, upload.single("resume"), uploadResume);
resumeRouter.get("/", protect, getResumes);
resumeRouter.get("/:id", protect, getResumeById);
resumeRouter.delete("/:id", protect, deleteResume);

export default resumeRouter;
