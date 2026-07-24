def clean_text(text):
    # Remove extra whitespace and newlines
    cleaned_text = ' '.join(text.split())

    cleaned_text  = cleaned_text.lower()

    return cleaned_text