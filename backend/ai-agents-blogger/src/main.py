# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from src.blogger import BloggerCrew

app = FastAPI()

class GenerateRequest(BaseModel):
    topic: str
    audience: str

@app.post("/generate")
def generate_content(req: GenerateRequest):
    blogger = BloggerCrew()
    blog_post, linkedin_post = blogger.run(req.topic, req.audience)
    return {
        "blog": blog_post,      # Make sure blog_post is a JSON string with the expected structure.
        "linkedin": linkedin_post
    }


@app.get("/")
def health_check():
    return {"status": "ok"}
