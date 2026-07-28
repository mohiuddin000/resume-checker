import Card from "../common/Card";

const badgeColors = {
    green: "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200",
    red: "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200",
    blue: "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200",
};

const icons = {
    green: "✅",
    red: "❌",
    blue: "➕",
};

const emptyMessages = {
    "Matched Skills": "No matched skills were identified.",
    "Missing Skills": "Great! No missing skills were found.",
    "Extra Skills": "No additional skills were identified.",
};

const SkillsSection = ({ title, skills = [], color = "blue" }) => {
    return (
        <Card className="p-6">
            <div className="mb-5 flex items-center gap-2">
                <span className="text-xl">{icons[color]}</span>

                <h2 className="text-xl font-semibold">{title}</h2>
            </div>

            {skills.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                    <p className="text-gray-500">
                        {emptyMessages[title] || "No skills found."}
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {[...new Set(skills)].map((skill) => (
                        <span
                            key={skill}
                            className={`cursor-default rounded-full px-4 py-2 text-sm font-medium transition ${badgeColors[color]}`}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default SkillsSection;
