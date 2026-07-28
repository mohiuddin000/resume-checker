import ResumeScoreCard from "./ResumeScoreCard";
import SkillsSection from "./SkillsSection";

const ResumeAnalysis = ({ analysis }) => {
    if (!analysis) return null;

    return (
        <div className="space-y-8">
            {/* Score Card */}
            <ResumeScoreCard score={analysis.score} />

            {/* Skills */}
            <div className="grid gap-6 lg:grid-cols-2">
                <SkillsSection
                    title="Matched Skills"
                    skills={analysis.matchedSkills || []}
                    color="green"
                />

                <SkillsSection
                    title="Missing Skills"
                    skills={analysis.missingSkills || []}
                    color="red"
                />
            </div>

            <SkillsSection
                title="Extra Skills"
                skills={analysis.extraSkills || []}
                color="blue"
            />
        </div>
    );
};

export default ResumeAnalysis;
