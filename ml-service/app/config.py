from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

UPLOAD_DIR = BASE_DIR / "uploads"

SKILLS_FILE = BASE_DIR / "data" / "skills.txt"

APP_NAME = "AI Resume Matcher"

APP_VERSION = "1.0.0"