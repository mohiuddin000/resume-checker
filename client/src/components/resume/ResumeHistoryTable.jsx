import { Link } from "react-router-dom";

const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
};

const ResumeHistoryTable = ({ resumes, onDelete }) => {
    if (resumes.length === 0) {
        return (
            <div className="rounded-lg bg-white p-10 text-center shadow">
                <div className="text-5xl">📄</div>

                <h2 className="mt-4 text-xl font-semibold">
                    No resume analyses yet
                </h2>

                <p className="mt-2 text-gray-500">
                    Upload your first resume from the dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left">Resume</th>

                        <th className="px-6 py-4 text-center">Score</th>

                        <th className="px-6 py-4 text-center">Date</th>

                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {resumes.map((resume) => (
                        <tr
                            key={resume._id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="px-6 py-4">
                                <div className="font-medium">
                                    {resume.originalFileName}
                                </div>
                            </td>

                            <td
                                className={`px-6 py-4 text-center font-bold ${getScoreColor(
                                    resume.score,
                                )}`}
                            >
                                {Math.round(resume.score)}%
                            </td>

                            <td className="px-6 py-4 text-center">
                                {new Date(
                                    resume.createdAt,
                                ).toLocaleDateString()}
                            </td>

                            <td className="space-x-2 px-6 py-4 text-right">
                                <Link
                                    to={`/resumes/${resume._id}`}
                                    className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                                >
                                    View
                                </Link>

                                <button
                                    onClick={() => onDelete(resume._id)}
                                    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResumeHistoryTable;
