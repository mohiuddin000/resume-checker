import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Spinner from "../../components/common/Spinner";

import ResumeUploadForm from "../../components/resume/ResumeUploadForm";
import ResumeTipsCard from "../../components/resume/ResumeTipsCard";
import RecentResumeList from "../../components/resume/RecentResumeList";

import { getResumes } from "../../services/resume.service";

const DashboardPage = () => {
    const [recentResumes, setRecentResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadRecent = async () => {
        try {
            setLoading(true);

            const response = await getResumes(1, 5);

            setRecentResumes(response.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to load recent analyses.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecent();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="mx-auto max-w-7xl p-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold">Welcome back 👋</h1>

                    <p className="mt-2 text-gray-600">
                        Upload your resume and compare it against a job
                        description to receive an ATS compatibility score.
                    </p>
                </div>

                <ResumeUploadForm onUploadSuccess={loadRecent} />

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <ResumeTipsCard />

                    {loading ? (
                        <div className="flex min-h-[250px] items-center justify-center rounded-lg bg-white shadow">
                            <Spinner />
                        </div>
                    ) : (
                        <RecentResumeList resumes={recentResumes} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
