# from parser import extract_text
# from preprocessing import clean_text
# from scorer import score_resume
# from fileReader import read_text

# raw_text = extract_text("data/resume1.pdf")
# resume_text = clean_text(raw_text)

# job_description_text = read_text("data/jd.txt")
# job_description_text = clean_text(job_description_text)

# score = score_resume(resume_text, job_description_text)

# print(f"Resume Score: {score}%")

from fastapi import FastAPI, HTTPException

from app.logger import logger
from app.models import ScoreRequest, ScoreResponse
from app.preprocessing import clean_text
from app.scorer import score_resume
from app.config import APP_NAME, APP_VERSION

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION
)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": f"{APP_NAME} is running"
    }


@app.post("/score", response_model=ScoreResponse)
def score(request: ScoreRequest):

    try:

        if not request.resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Resume text cannot be empty."
            )

        if not request.jd_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Job description cannot be empty."
            )

        resume = clean_text(request.resume_text)
        jd = clean_text(request.jd_text)

        result = score_resume(resume, jd)

        logger.info("Resume scored successfully.")

        return result

    except HTTPException:
        raise

    except Exception as e:

        logger.exception("Unexpected error while scoring resume.")

        raise HTTPException(
            status_code=500,
            detail="Internal server error."
        )