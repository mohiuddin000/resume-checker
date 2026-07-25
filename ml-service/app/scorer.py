from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity 
from app.skills import extract_skills

def score_resume(resume_text, job_description_text):
    # Create a TfidfVectorizer to convert text to TF-IDF vectors
    vectorizer = TfidfVectorizer()

    # Combine the resume and job description into a single list
    documents = [resume_text, job_description_text]

    # Fit and transform the documents to get the TF-IDF matrix
    tfidf_matrix = vectorizer.fit_transform(documents)

    # Calculate cosine similarity between the resume and job description
    similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

    score = round(similarity_score[0][0] * 100, 2)

    resume_skills = extract_skills(resume_text)
    job_description_skills = extract_skills(job_description_text)

    matching_skills = sorted(resume_skills & job_description_skills)
    missing_skills = sorted(job_description_skills - resume_skills)
    extra_skills = sorted(resume_skills - job_description_skills)

    return {
    "score": float(score),
    "matched_skills": matching_skills,
    "missing_skills": missing_skills,
    "extra_skills": extra_skills,
}
