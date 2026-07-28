import Card from "../common/Card";

const ResumeTipsCard = () => {
    const tips = [
        "Upload a PDF resume.",
        "Use an ATS-friendly layout.",
        "Match keywords from the job description.",
        "Highlight measurable achievements.",
        "Keep your resume up to date.",
    ];

    return (
        <Card>
            <h2 className="mb-4 text-xl font-bold">Resume Tips</h2>

            <ul className="space-y-2">
                {tips.map((tip) => (
                    <li key={tip}>✅ {tip}</li>
                ))}
            </ul>
        </Card>
    );
};

export default ResumeTipsCard;
