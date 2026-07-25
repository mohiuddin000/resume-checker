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

import os

from fastapi import FastAPI, UploadFile, File, Form, HTTPException

from app.config import APP_NAME, APP_VERSION, UPLOAD_DIR
from app.logger import logger
from app.models import ScoreResponse
from app.parser import extract_text
from app.preprocessing import clean_text
from app.scorer import score_resume

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": f"{APP_NAME} is running",
    }


@app.post("/score", response_model=ScoreResponse)
async def score(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
):

    file_path = UPLOAD_DIR / resume.filename

    try:

        if resume.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed.",
            )

        with open(file_path, "wb") as file:
            file.write(await resume.read())

        resume_text = clean_text(extract_text(file_path))
        jd_text = clean_text(job_description)

        result = score_resume(
            resume_text,
            jd_text,
        )

        logger.info("Resume scored successfully.")

        return result

    finally:

        if os.path.exists(file_path):
            os.remove(file_path)