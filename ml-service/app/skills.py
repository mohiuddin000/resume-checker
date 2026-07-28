# import re
# from app.fileReader import read_text

# SKILLS = {
#     skill.strip().lower()
#     for skill in read_text("data/skills.txt").splitlines()
#     if skill.strip()
# }

# def extract_skills(text):
#     text = text.lower()
#     extracted_skills = set()
#     for skill in SKILLS:
#         pattern = rf"\b{re.escape(skill)}\b"
#         if re.search(pattern, text):
#             extracted_skills.add(skill)

#     return extracted_skills


import re

from app.config import SKILLS_FILE, ALIASES_FILE
from app.fileReader import read_text


def _load_skills():
    skills = {
        skill.strip().lower()
        for skill in read_text(SKILLS_FILE).splitlines()
        if skill.strip() and not skill.strip().startswith("#")
    }
    return skills


def _load_aliases():
    """
    Maps common alternate spellings/abbreviations to the canonical skill
    name used in skills.txt, e.g. "js" -> "javascript".
    """
    aliases = {}
    for line in read_text(ALIASES_FILE).splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        alias, canonical = line.split("=", 1)
        aliases[alias.strip().lower()] = canonical.strip().lower()
    return aliases


SKILLS = _load_skills()
ALIASES = _load_aliases()

# Sort longest-first so multi-word skills/aliases (e.g. "rest api") are
# matched before shorter overlapping ones.
_ALL_TERMS = sorted(set(SKILLS) | set(ALIASES.keys()), key=len, reverse=True)


def _compile_pattern(term):
    # Allow an optional trailing "s"/"es" so plurals ("apis", "databases")
    # still match, and use a boundary that tolerates the term being
    # followed directly by punctuation.
    escaped = re.escape(term)
    return re.compile(rf"(?<!\w){escaped}(?:es|s)?(?!\w)")


_PATTERNS = {term: _compile_pattern(term) for term in _ALL_TERMS}


def extract_skills(text: str) -> set[str]:
    """
    Finds every known skill (or alias of a known skill) mentioned in text
    and returns the set of canonical skill names found.
    """
    text = text.lower()
    found = set()

    for term in _ALL_TERMS:
        if _PATTERNS[term].search(text):
            canonical = ALIASES.get(term, term)
            found.add(canonical)

    return found