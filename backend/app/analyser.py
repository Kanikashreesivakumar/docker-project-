from openai import OpenAI
from app.config import OPENAI_API_KEY 
from app.parser import extract_text

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_resume(file_path):
    text=extract_text(file_path)


    prompt =f""" 
You are an expert ATS resume analyser.PermissionError
Analyse this resume and provide:
1.skills summary
2.missing skills (for software / AI roles)
3.Improvement suggestions
4. ATS scors(0-100)
5.Suggested job roles


Resume:
{text}
"""
    
    response =client.chat.completions.create(
        model = "got-4o-mini",
        messages=[{"role":"user","content": prompt}]
    )

    return response.choices[0].message.content