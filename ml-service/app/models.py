# from pydantic import BaseModel


# class ScoreRequest(BaseModel):
#     resume_text: str
#     jd_text: str
from pydantic import BaseModel


class ScoreResponse(BaseModel):
    score: float
    matched_skills: list[str]
    missing_skills: list[str]
    extra_skills: list[str]