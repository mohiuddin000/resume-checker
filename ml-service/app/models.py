from pydantic import BaseModel


class ScoreRequest(BaseModel):
    resume_text: str
    jd_text: str


class ScoreResponse(BaseModel):
    score: float
    matching_skills: list[str]
    missing_skills: list[str]
    extra_skills: list[str]