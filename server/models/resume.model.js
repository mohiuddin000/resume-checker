import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        originalFileName: {
            type: String,
            required: true,
            trim: true,
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        matchedSkills: {
            type: [String],
            default: [],
        },

        missingSkills: {
            type: [String],
            default: [],
        },

        extraSkills: {
            type: [String],
            default: [],
        },

        jobDescription: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
