import fs from "fs/promises";

import Resume from "../models/resume.model.js";
import { scoreResume } from "./python.service.js";
import AppError from "../utils/AppError.js";

export const uploadResumeService = async ({ userId, file, jobDescription }) => {
    if (!file) {
        throw new AppError("Resume PDF is required.", 400);
    }

    if (!jobDescription?.trim()) {
        throw new AppError("Job description is required.", 400);
    }

    let scoreResult;

    try {
        scoreResult = await scoreResume(file.path, jobDescription);
    } catch (error) {
        throw new AppError(
            "Unable to process resume. Please try again later.",
            502,
        );
    }

    try {
        const resume = await Resume.create({
            user: userId,
            originalFileName: file.originalname,
            score: scoreResult.score,
            matchedSkills: scoreResult.matched_skills,
            missingSkills: scoreResult.missing_skills,
            extraSkills: scoreResult.extra_skills,
            jobDescription,
        });

        return {
            id: resume._id,
            score: resume.score,
            matchedSkills: resume.matchedSkills,
            missingSkills: resume.missingSkills,
            extraSkills: resume.extraSkills,
            createdAt: resume.createdAt,
        };
    } finally {
        await fs.unlink(file.path).catch(() => {});
    }
};

// /**
//  * Uploads a resume, requests analysis from the Python ML service,
//  * stores the result in MongoDB, and returns the saved analysis.
//  *
//  * @param {Object} params
//  * @param {string} params.userId
//  * @param {Express.Multer.File} params.file
//  * @param {string} params.jobDescription
//  * @returns {Promise<Object>}
//  */

// export const getResumesService = async (userId) => {
//     const resumes = await Resume.find({ user: userId })
//         .sort({ createdAt: -1 })
//         .select(
//             "_id originalFileName score matchedSkills missingSkills extraSkills createdAt",
//         );

//     return resumes;
// };

export const getResumesService = async (userId, page = 1, limit = 10) => {
    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const skip = (currentPage - 1) * pageSize;

    const [resumes, total] = await Promise.all([
        Resume.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .select(
                "_id originalFileName score matchedSkills missingSkills extraSkills createdAt",
            )
            .lean(),

        Resume.countDocuments({ user: userId }),
    ]);

    return {
        resumes,
        pagination: {
            total,
            page: currentPage,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
            hasNextPage: currentPage * pageSize < total,
            hasPreviousPage: currentPage > 1,
        },
    };
};

export const getResumeByIdService = async (resumeId, userId) => {
    const resume = await Resume.findOne({
        _id: resumeId,
        user: userId,
    });

    if (!resume) {
        throw new AppError("Resume not found.", 404);
    }

    return resume;
};

export const deleteResumeService = async (resumeId, userId) => {
    const resume = await Resume.findOne({
        _id: resumeId,
        user: userId,
    });

    if (!resume) {
        throw new AppError("Resume not found.", 404);
    }

    await resume.deleteOne();

    return;
};
