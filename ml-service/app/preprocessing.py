# def clean_text(text):
#     # Remove extra whitespace and newlines
#     cleaned_text = ' '.join(text.split())

#     cleaned_text  = cleaned_text.lower()

#     return cleaned_text


import re

_EMAIL_RE = re.compile(r"\S+@\S+\.\S+")
_URL_RE = re.compile(r"https?://\S+|www\.\S+")
_PHONE_RE = re.compile(r"\+?\d[\d\s\-()]{7,}\d")


def clean_text(text: str) -> str:
    """
    Normalizes raw resume/JD text before it goes into skill extraction and
    TF-IDF similarity. Strips contact-info noise (emails, phone numbers,
    URLs) that adds nothing to the match signal, while deliberately keeping
    characters like '.', '+', '#' since they're part of real skill names
    (node.js, c++, c#).
    """
    text = _EMAIL_RE.sub(" ", text)
    text = _URL_RE.sub(" ", text)
    text = _PHONE_RE.sub(" ", text)

    # Collapse all whitespace/newlines.
    text = " ".join(text.split())

    return text.lower()