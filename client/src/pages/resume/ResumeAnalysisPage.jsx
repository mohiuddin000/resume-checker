import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Spinner from "../../components/common/Spinner";
import ResumeAnalysis from "../../components/resume/ResumeAnalysis";

import { getResumeById } from "../../services/resume.service";

const ResumeAnalysisPage = () => {
    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await getResumeById(id);

                setAnalysis(response.data);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                        "Unable to load resume analysis.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id]);

    if (loading) {
        return <Spinner fullScreen />;
    }

    if (!analysis) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />

                <main className="mx-auto max-w-6xl p-6">
                    <div className="rounded-lg bg-white p-10 text-center shadow">
                        <h2 className="text-2xl font-bold">
                            Analysis not found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            The requested resume analysis could not be found.
                        </p>

                        <Link
                            to="/resumes"
                            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                        >
                            Back to Resume History
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="mx-auto max-w-6xl p-6">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Resume Analysis</h1>

                        <p className="mt-2 text-gray-600">
                            Review your ATS score and skill matching results.
                        </p>
                    </div>

                    <Link
                        to="/resumes"
                        className="rounded-lg bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-900"
                    >
                        ← Back to History
                    </Link>
                </div>

                <div className="mb-6 rounded-lg bg-white p-6 shadow">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">Resume</p>

                            <p className="mt-1 font-semibold">
                                {analysis.originalFileName ||
                                    analysis.fileName ||
                                    "Uploaded Resume"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Analysis Date
                            </p>

                            <p className="mt-1 font-semibold">
                                {analysis.createdAt
                                    ? new Date(
                                          analysis.createdAt,
                                      ).toLocaleString()
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>

                <ResumeAnalysis analysis={analysis} />
            </main>
        </div>
    );
};

export default ResumeAnalysisPage;
