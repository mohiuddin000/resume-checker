# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity 
# from app.skills import extract_skills

# def score_resume(resume_text, job_description_text):
#     # Create a TfidfVectorizer to convert text to TF-IDF vectors
#     vectorizer = TfidfVectorizer()

#     # Combine the resume and job description into a single list
#     documents = [resume_text, job_description_text]

#     # Fit and transform the documents to get the TF-IDF matrix
#     tfidf_matrix = vectorizer.fit_transform(documents)

#     # Calculate cosine similarity between the resume and job description
#     similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

#     score = round(similarity_score[0][0] * 100, 2)

#     resume_skills = extract_skills(resume_text)
#     job_description_skills = extract_skills(job_description_text)

#     matching_skills = sorted(resume_skills & job_description_skills)
#     missing_skills = sorted(job_description_skills - resume_skills)
#     extra_skills = sorted(resume_skills - job_description_skills)

#     return {
#     "score": float(score),
#     "matched_skills": matching_skills,
#     "missing_skills": missing_skills,
#     "extra_skills": extra_skills,
# }


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.config import CONTENT_SIMILARITY_WEIGHT, SKILL_MATCH_WEIGHT
from app.skills import extract_skills


def _content_similarity(resume_text: str, job_description_text: str) -> float:
    """
    TF-IDF cosine similarity between the full resume and JD text.
    This is a secondary/supporting signal — with only two documents to fit
    on, TF-IDF's IDF weighting is inherently noisy, so it's intentionally
    NOT the main driver of the final score (see score_resume below).
    """
    if not resume_text.strip() or not job_description_text.strip():
        return 0.0

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        sublinear_tf=True,
    )

    try:
        tfidf_matrix = vectorizer.fit_transform([resume_text, job_description_text])
    except ValueError:
        # Happens if, after removing stopwords, nothing is left to vectorize.
        return 0.0

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    return float(similarity)


def score_resume(resume_text: str, job_description_text: str) -> dict:
    resume_skills = extract_skills(resume_text)
    job_description_skills = extract_skills(job_description_text)

    matched_skills = sorted(resume_skills & job_description_skills)
    missing_skills = sorted(job_description_skills - resume_skills)
    extra_skills = sorted(resume_skills - job_description_skills)

    content_similarity = _content_similarity(resume_text, job_description_text)

    if job_description_skills:
        skill_match_ratio = len(matched_skills) / len(job_description_skills)
        final_score = (
            SKILL_MATCH_WEIGHT * skill_match_ratio
            + CONTENT_SIMILARITY_WEIGHT * content_similarity
        )
    else:
        # No recognizable skills in the JD (e.g. it's freeform prose with no
        # terms from our skills list) - fall back to content similarity only,
        # since a skill-coverage ratio would be meaningless (0/0).
        skill_match_ratio = None
        final_score = content_similarity

    return {
        "score": round(final_score * 100, 2),
        "skill_match_score": round(skill_match_ratio * 100, 2) if skill_match_ratio is not None else None,
        "content_similarity_score": round(content_similarity * 100, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "extra_skills": extra_skills,
    }