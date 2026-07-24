import re
from app.fileReader import read_text

SKILLS = {
    skill.strip().lower()
    for skill in read_text("data/skills.txt").splitlines()
    if skill.strip()
}

def extract_skills(text):
    text = text.lower()
    extracted_skills = set()
    for skill in SKILLS:
        pattern = rf"\b{re.escape(skill)}\b"
        if re.search(pattern, text):
            extracted_skills.add(skill)

    return extracted_skills