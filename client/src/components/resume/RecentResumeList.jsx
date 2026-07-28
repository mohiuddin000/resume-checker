import { Link } from "react-router-dom";

import Card from "../common/Card";

const RecentResumeList = ({ resumes = [] }) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Analyses</h2>

                <Link
                    to="/resumes"
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    View All
                </Link>
            </div>

            {resumes.length === 0 ? (
                <p className="mt-6 text-gray-500">No analyses yet.</p>
            ) : (
                <div className="mt-4 space-y-4">
                    {resumes.slice(0, 5).map((resume) => (
                        <Link
                            key={resume._id}
                            to={`/resumes/${resume._id}`}
                            className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-gray-50"
                        >
                            <div>
                                <p className="font-medium">
                                    {resume.originalFileName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        resume.createdAt,
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <span className="font-bold text-green-600">
                                {Math.round(resume.score)}%
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default RecentResumeList;
