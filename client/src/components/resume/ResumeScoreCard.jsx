import Card from "../common/Card";

const ResumeScoreCard = ({ score = 0 }) => {
    const roundedScore = Math.round(score);

    const scoreColor =
        roundedScore >= 80
            ? "text-green-600"
            : roundedScore >= 60
              ? "text-yellow-600"
              : "text-red-600";

    const progressColor =
        roundedScore >= 80
            ? "bg-green-600"
            : roundedScore >= 60
              ? "bg-yellow-500"
              : "bg-red-600";

    const status =
        roundedScore >= 80
            ? "Excellent Match"
            : roundedScore >= 60
              ? "Good Match"
              : "Needs Improvement";

    const description =
        roundedScore >= 80
            ? "Your resume closely matches the job description."
            : roundedScore >= 60
              ? "Your resume is a good match but could be improved."
              : "Consider adding more relevant skills and keywords.";

    return (
        <Card className="p-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Resume Match Score</h2>

                <p className="mt-2 text-gray-500">
                    ATS compatibility based on the provided job description.
                </p>

                <div className={`mt-8 text-7xl font-bold ${scoreColor}`}>
                    {roundedScore}%
                </div>

                <div
                    className={`mt-3 inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                        roundedScore >= 80
                            ? "bg-green-100 text-green-700"
                            : roundedScore >= 60
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                    }`}
                >
                    {status}
                </div>

                <div className="mt-8">
                    <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className={`h-full ${progressColor} transition-all duration-700`}
                            style={{
                                width: `${roundedScore}%`,
                            }}
                        />
                    </div>
                </div>

                <p className="mt-6 text-gray-600">{description}</p>
            </div>
        </Card>
    );
};

export default ResumeScoreCard;
