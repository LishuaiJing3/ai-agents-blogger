# backend/blogger.py

import google.generativeai as genai
from dotenv import load_dotenv
import os
from crewai import Agent
from google.generativeai.types import GenerationConfig

# Load API key from .env (ensure you have a .env file locally with your key)
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

class GeminiClient:
    """Wrapper to interact with Google Gemini API"""
    def __init__(self, model="gemini-2.0-flash-exp"):
        self.model = genai.GenerativeModel(model)

    def generate(self, prompt, max_tokens=1000, temperature=0.7, top_p=0.9):
        """Generates content from Gemini"""
        generation_config = GenerationConfig(
            max_output_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            response_mime_type="application/json"
        )
        try:
            response = self.model.generate_content(
                contents=prompt,
                generation_config=generation_config,
                safety_settings=[]
            )
            return response.text if response else "No response generated."
        except Exception as e:
            return f"Error: {str(e)}"

# Initialize GeminiClient
gemini = GeminiClient()

# Define Agents
class ContentAnalyst(Agent):
    def __init__(self):
        super().__init__(
            role="Content Analyst",
            goal="Extract key insights from user-provided topics and structure information for a blog.",
            backstory="An experienced content strategist specializing in analyzing trending topics.",
        )

    def run(self, topic, target_audience):
        analysis_prompt = (
            f"Analyze the topic '{topic}' for the target audience '{target_audience}'. "
            "Extract the most important key points to cover in a professional blog post."
        )
        return gemini.generate(analysis_prompt)

class BrainstormingAgent(Agent):
    def __init__(self):
        super().__init__(
            role="Brainstorming Specialist",
            goal="Generate creative blog ideas and outlines.",
            backstory="A marketing expert with a knack for structuring compelling content.",
        )

    def run(self, key_points):
        brainstorming_prompt = (
            f"Given these key points: {key_points}, generate 3-5 engaging blog ideas "
            "and an outline for each to structure a high-quality post."
        )
        return gemini.generate(brainstorming_prompt)

class DraftingAgent(Agent):
    def __init__(self):
        super().__init__(
            role="Content Writer",
            goal="Transform outlines into detailed blog drafts.",
            backstory="A seasoned writer who crafts professional and engaging content.",
        )

    def run(self, blog_outline):
        drafting_prompt = (
            f"Using this blog outline: {blog_outline}, write a professional long-form blog post. "
            "Ensure clarity, coherence, and engagement."
        )
        return gemini.generate(drafting_prompt)

class CritiqueAgent(Agent):
    def __init__(self):
        super().__init__(
            role="Editorial Reviewer",
            goal="Evaluate drafts and provide constructive feedback.",
            backstory="A professional editor with expertise in refining content for maximum impact.",
        )

    def run(self, drafts):
        critique_prompt = (
            f"Review these drafts: {drafts}. Provide feedback on clarity, depth, and engagement. "
            "Suggest improvements for better impact."
        )
        return gemini.generate(critique_prompt)

class FinalizationAgent(Agent):
    def __init__(self):
        super().__init__(
            role="Content Finalizer",
            goal="Polish the blog and create a short LinkedIn summary.",
            backstory="An expert content marketer skilled in crafting engaging blog posts and social media content.",
        )

    def run(self, improved_draft):
        blog_finalization_prompt = (
            f"Refine this draft into a polished, publication-ready blog post: {improved_draft}"
        )
        linkedin_summary_prompt = (
            f"Summarize this blog post into an engaging LinkedIn post: {improved_draft}. "
            "Ensure it's concise, compelling, and suitable for LinkedIn."
        )
        final_blog = gemini.generate(blog_finalization_prompt)
        linkedin_post = gemini.generate(linkedin_summary_prompt)
        return final_blog, linkedin_post

# Orchestrate the workflow
class BloggerCrew:
    def __init__(self):
        self.content_analyst = ContentAnalyst()
        self.brainstorming_agent = BrainstormingAgent()
        self.drafting_agent = DraftingAgent()
        self.critique_agent = CritiqueAgent()
        self.finalization_agent = FinalizationAgent()

    def run(self, topic, target_audience):
        key_points = self.content_analyst.run(topic, target_audience)
        blog_outline = self.brainstorming_agent.run(key_points)
        drafts = self.drafting_agent.run(blog_outline)
        improved_draft = self.critique_agent.run(drafts)
        final_blog, linkedin_summary = self.finalization_agent.run(improved_draft)
        return final_blog, linkedin_summary

# Example usage when running as a script
if __name__ == "__main__":
    topic = "The Future of AI in Healthcare"
    target_audience = "Healthcare professionals and technology executives"

    blogger = BloggerCrew()
    blog_post, linkedin_post = blogger.run(topic, target_audience)

    print("\n🎯 **Final Blog Post:**\n")
    print(blog_post)
    print("\n🔹 **LinkedIn Summary:**\n")
    print(linkedin_post)
