import {
    deleteResumeService,
    getResumeByIdService,
    getResumesService,
    uploadResumeService,
} from "../services/resume.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const uploadResume = asyncHandler(async (req, res) => {
    const result = await uploadResumeService({
        userId: req.user._id,
        file: req.file,
        jobDescription: req.body.jobDescription,
    });

    res.status(201).json({
        success: true,
        message: "Resume analyzed successfully.",
        data: result,
    });
});

// export const getResumes = asyncHandler(async (req, res) => {
//     const resumes = await getResumesService(req.user._id);

//     res.status(200).json({
//         success: true,
//         data: resumes,
//     });
// });

export const getResumes = asyncHandler(async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const result = await getResumesService(req.user._id, page, limit);

    res.status(200).json({
        success: true,
        data: result.resumes,
        pagination: result.pagination,
    });
});

export const getResumeById = asyncHandler(async (req, res) => {
    const resume = await getResumeByIdService(req.params.id, req.user._id);

    res.status(200).json({
        success: true,
        data: resume,
    });
});

export const deleteResume = asyncHandler(async (req, res) => {
    await deleteResumeService(req.params.id, req.user._id);

    res.status(200).json({
        success: true,
        message: "Resume deleted successfully.",
    });
});
