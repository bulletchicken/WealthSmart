import openai
import os
import json

# Set up OpenAI API key (replace with your actual API key)
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Function to make a call to GPT and get a response
def get_gpt_response(prompt: str):
    response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a financial advisor specializing in helping small businesses make data-driven decisions. Provide advice by talking about the numbers, and connecting the company’s summary and financial data to relevant real-world news given. Make reasonable assumptions, but clearly state when you’re speculating. Use straightforward, easy-to-digest language, and focus on balancing positives (opportunities) and negatives (risks). Relate costs, challenges, and strategies directly to the company’s specific needs. Ensure your advice is actionable and insightful, helping the business grow in today’s market."},
        {
            "role": "user",
            "content": prompt
        }
    ],

    # FreakyGPT
    temperature=0.8
)
    return response.choices[0].message.content



def analyze_financial_trends(message: str):
    
    try:
        with open('pretend_this_is_a_database/income_data.json', 'r') as file:
            income_data = json.load(file)
        
        # Load company description from 'summary.json'
        with open('pretend_this_is_a_database/summary.json', 'r') as file:
            company_description = json.load(file)
            
        work = company_description[0]  # First index: company description
        news_data = company_description[1]
        
        # Prepare the full data for GPT (as raw JSON)
        prompt = (
            f"Company Description: {json.dumps(work)}\n\n"
            f"Financial Data: {json.dumps(income_data)}\n\n"
            f"News Data: {json.dumps(news_data)}\n\n"
            f"Message: {message}\n\n"
        )

        # Send the prompt to GPT for analysis
        gpt_response = get_gpt_response(prompt)
        return gpt_response
    except FileNotFoundError:
        print("Error: 'data.json' or 'summary.json' file not found.")
        return None
    except json.JSONDecodeError:
        print("Error: 'data.json' or 'summary.json' is not a valid JSON.")
        return None