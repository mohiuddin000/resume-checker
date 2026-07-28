# from pathlib import Path

# BASE_DIR = Path(__file__).resolve().parent.parent

# UPLOAD_DIR = BASE_DIR / "uploads"

# SKILLS_FILE = BASE_DIR / "data" / "skills.txt"

# APP_NAME = "AI Resume Matcher"

# APP_VERSION = "1.0.0"

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

DATA_DIR = BASE_DIR / "data"
SKILLS_FILE = DATA_DIR / "skills.txt"
ALIASES_FILE = DATA_DIR / "skill_aliases.txt"

APP_NAME = "AI Resume Matcher"
APP_VERSION = "1.1.0"

# Weighting for the final score. Skill overlap is a much more reliable
# signal than raw TF-IDF similarity of the whole document, so it gets the
# larger weight. Tune these if you want similarity to matter more/less.
SKILL_MATCH_WEIGHT = 0.85       # was 0.65
CONTENT_SIMILARITY_WEIGHT = 0.15 # was 0.35

MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB