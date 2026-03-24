import PyPDF2

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        text = ""
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
        return text
    else:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()