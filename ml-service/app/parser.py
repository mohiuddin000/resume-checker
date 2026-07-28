# import pdfplumber

# def extract_text(file_path):
#     text = ""

#     with pdfplumber.open(file_path) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += page_text
#     return text

import pdfplumber


class PdfExtractionError(Exception):
    """Raised when a PDF cannot be opened or contains no extractable text."""


def extract_text(file_path) -> str:
    text_parts = []

    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                # x_tolerance/y_tolerance matter a lot here: pdfplumber's
                # defaults merge adjacent words in justified/kerned text
                # (e.g. "applications and NLP" -> "applicationsandNLP").
                # Loosening them keeps words correctly separated.
                page_text = page.extract_text(x_tolerance=1.5, y_tolerance=3)
                if page_text:
                    text_parts.append(page_text)
    except Exception as exc:
        raise PdfExtractionError(f"Could not read PDF: {exc}") from exc

    text = "\n".join(text_parts).strip()

    if not text:
        raise PdfExtractionError(
            "No extractable text found in PDF (it may be a scanned image "
            "with no OCR layer)."
        )

    return text