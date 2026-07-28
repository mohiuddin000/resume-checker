
# import os

# from fastapi import FastAPI, UploadFile, File, Form, HTTPException

# from app.config import APP_NAME, APP_VERSION, UPLOAD_DIR
# from app.logger import logger
# from app.models import ScoreResponse
# from app.parser import extract_text
# from app.preprocessing import clean_text
# from app.scorer import score_resume

# app = FastAPI(
#     title=APP_NAME,
#     version=APP_VERSION,
# )


# @app.get("/")
# def home():
#     return {
#         "status": "success",
#         "message": f"{APP_NAME} is running",
#     }


# @app.post("/score", response_model=ScoreResponse)
# async def score(
#     resume: UploadFile = File(...),
#     job_description: str = Form(...),
# ):

#     file_path = UPLOAD_DIR / resume.filename

#     try:

#         if resume.content_type != "application/pdf":
#             raise HTTPException(
#                 status_code=400,
#                 detail="Only PDF files are allowed.",
#             )

#         with open(file_path, "wb") as file:
#             file.write(await resume.read())

#         resume_text = clean_text(extract_text(file_path))
#         jd_text = clean_text(job_description)

#         result = score_resume(
#             resume_text,
#             jd_text,
#         )

#         logger.info("Resume scored successfully.")

#         return result

#     finally:

#         if os.path.exists(file_path):
#             os.remove(file_path)



import asyncio
import os
import uuid

from fastapi import FastAPI, UploadFile, File, Form, HTTPException

from app.config import APP_NAME, APP_VERSION, MAX_UPLOAD_SIZE_BYTES, UPLOAD_DIR
from app.logger import logger
from app.models import ScoreResponse
from app.parser import PdfExtractionError, extract_text
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
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    if not job_description.strip():
        raise HTTPException(status_code=400, detail="job_description cannot be empty.")

    contents = await resume.read()

    if len(contents) > MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="Resume file is too large (max 5 MB).")

    # Use a generated filename rather than the client-supplied one: an
    # untrusted filename written straight to disk is a path-traversal risk
    # (e.g. "../../etc/something.pdf") and concurrent requests with the
    # same original filename would overwrite each other.
    file_path = UPLOAD_DIR / f"{uuid.uuid4().hex}.pdf"

    try:
        with open(file_path, "wb") as file:
            file.write(contents)

        # extract_text / score_resume are CPU-bound and synchronous; running
        # them directly in this async endpoint would block the whole event
        # loop (and every other in-flight request) until they finish.
        # asyncio.to_thread offloads them to a worker thread instead.
        resume_text = await asyncio.to_thread(extract_text, file_path)
        resume_text = clean_text(resume_text)
        jd_text = clean_text(job_description)

        result = await asyncio.to_thread(score_resume, resume_text, jd_text)

        logger.info("Resume scored successfully.")

        return result

    except PdfExtractionError as exc:
        logger.warning("PDF extraction failed: %s", exc)
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)