from flask import request, jsonify
from flask_smorest import Blueprint
import requests
from openai import OpenAI
from google import genai
from pydantic import BaseModel

bp = Blueprint('integration', __name__)  # instantiate your 'integration' Blueprint

class Recipe(BaseModel):
    recipe_name: str
    about: str
    ingredients: list[str]
    image: str
    how_to_prepare: list[str]
    nutritional_values: str
    

class RecipeFinder():
    #defunct
    def ask_flan_T5():
        FlanT5_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
        user_query = request.json.get('prompt')
        payload = { "inputs": user_query }
        flanT5_api_key = "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"
        
        headers = {
            "Authorization": f"Bearer {flanT5_api_key}",
            "Content-Type": "application/json"
        }
        response = requests.post(FlanT5_API_URL,
                                headers=headers,
                                json=payload)
        
        response = response.json()
        response = response[0].get('generated_text', "Sorry, I couldn't generate a proper response.")

        # return jsonify(response)
        return response

    def ask_deepseek():
        user_query = request.json.get('prompt')
        deepseek_api_key="sk-acb0ab53b98b4900a250ae8482ee3a65"
        headers = {
            "Authorization": f"Bearer {deepseek_api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "deepseek-chat",
            "messages": [
                {"role": "user", "content": user_query}
            ]
        }

        response = requests.post("https://api.deepseek.com/v1/chat/completions", 
                                headers=headers, json=data)

        return jsonify(response.json())

    #METHOD 2 DEEPSEEK
    def deepseek2():
        client = OpenAI(api_key= '', base_url="https://api.deepseek.com")
        response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "user", "content": 'Hello'},
        ],
        stream=False
        )   
        return jsonify(response.choices[0].message.content)
    
    @bp.route('/recipe-suggestion', methods = ['POST'])
    # @bp.response(status_code=200)    
    def get_recipe_suggestion_gemini():
        gemini_model = "gemini-2.0-flash"
        client = genai.Client(api_key="AIzaSyCjjidJU48zwK7PF3Zhc3uXdjn2gaSztNc")
        user_query = request.json.get('prompt')

        response = client.models.generate_content(
            model = gemini_model,
            contents= user_query,
            config={
                "response_mime_type": "application/json",
                "response_schema": list[Recipe],
            },
        )

        # Use the response as a JSON string.
        response = response.text
        return response
    
        # Use instantiated objects.
        # my_recipes: list[Recipe] = response.parsed

        # return my_recipes
