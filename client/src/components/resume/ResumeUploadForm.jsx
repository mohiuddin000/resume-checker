import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";
import Textarea from "../common/Textarea";
import ResumeDropzone from "./ResumeDropzone";

import { uploadResume } from "../../services/resume.service";
import { jobDescriptionValidation } from "../../utils/validators";

const ResumeUploadForm = ({ onUploadSuccess }) => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            jobDescription: "",
        },
    });

    const jobDescription = watch("jobDescription", "");

    const onSubmit = async (data) => {
        if (!file) {
            toast.error("Please upload a PDF resume.");
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);
        formData.append("jobDescription", data.jobDescription);

        try {
            const response = await uploadResume(formData);

            toast.success(response.message || "Resume analyzed successfully.");

            onUploadSuccess?.();

            reset();
            setFile(null);

            navigate(`/resumes/${response.data.id}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Resume upload failed.",
            );
        }
    };

    return (
        <Card className="p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Resume Analysis</h2>

                <p className="mt-2 text-gray-600">
                    Upload your resume and paste the job description to receive
                    an ATS compatibility analysis.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-8 lg:grid-cols-3">
                    <div>
                        <label className="mb-3 block font-semibold">
                            Resume (PDF)
                        </label>

                        <ResumeDropzone file={file} onFileSelect={setFile} />

                        <p className="mt-3 text-sm text-gray-500">
                            Supported format: PDF (Maximum 5 MB)
                        </p>
                    </div>

                    <div className="lg:col-span-2">
                        <Textarea
                            label="Job Description"
                            rows={14}
                            placeholder="Paste the complete job description from the employer..."
                            {...register(
                                "jobDescription",
                                jobDescriptionValidation,
                            )}
                            error={errors.jobDescription?.message}
                        />

                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                            <span>
                                Include responsibilities, skills, and
                                qualifications.
                            </span>

                            <span>{jobDescription.length} characters</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={!file || isSubmitting}
                    >
                        Analyze Resume
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default ResumeUploadForm;
