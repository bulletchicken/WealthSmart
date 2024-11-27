from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .retrieve_format import scrape_clean
from .mastermind import analyze_financial_trends
from pydantic import BaseModel
from .sentiment_prompt import scrape
import re
import json

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# CORS yelling at me solution - allow requests from frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

# Function to extract the Google Sheet ID
def extract_google_sheet_id(url: str):
    match = re.search(r"/d/([a-zA-Z0-9-_]+)", url)
    if match:
        return match.group(1)
    return None

# Pydantic model for request body
class MessageRequest(BaseModel):
    url: str
    
class SummaryRequest(BaseModel):
    key_words: str
    summary: str

@app.post("/api/post_data")
async def post_data(request: MessageRequest):
    
    # Extract Google Sheets ID
    sheet_id = extract_google_sheet_id(request.url)
    if not sheet_id:
        raise HTTPException(status_code=400, detail="Invalid Google Sheets URL")
    
    # Process using scrape_clean
    scrape_clean(sheet_id)
    # Return the response
    return {"message": "Data processed successfully"}

@app.post("/api/post_context")
async def post_context(company: SummaryRequest):
    newsTopics = company.key_words
    summary_text = company.summary
    
    with open('pretend_this_is_a_database/summary.json', 'r+') as file:
        data = json.load(file)
        data[0] = summary_text
        data[1] = await scrape(newsTopics)
        file.seek(0)  # Move file pointer to the beginning
        json.dump(data, file, indent=4)
        file.truncate()  # Ensure to remove any leftover content
        print(data[1]['total_results'])
        return data[1]['total_results']

@app.get("/api/get_data")
async def get_data():
    try:
        with open("pretend_this_is_a_database/income_data.json", "r") as file:
            data = json.load(file)  # Load JSON content from the file
        return data  # Return the loaded JSON
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Data file not found")
    
    
@app.get("/api/expense_titles")
async def get_expense_titles():
    try:
        with open("labels/expense_titles.json", "r") as file:
            expense_titles = json.load(file)
        return expense_titles
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Expense titles file not found")


@app.get("/api/revenue_titles")
async def get_revenue_titles():
    try:
        with open("labels/revenue_titles.json", "r") as file:
            revenue_titles = json.load(file)
        return revenue_titles
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Revenue titles file not found")
    
@app.get("/api/gpt_trends")
async def get_gpt_response():
    response = analyze_financial_trends("In point form, analyze the top 3 trends between the companies financial data and use real-world data/news to establish correlations and recommendations. Clearly specify the numbers, their context, and what they represent. If necessary, create assumptions, but explicitly state that they are hypothetical. Factor in the time of year and its potential impact on the analysis. Use emojis ocassionally")
    return {"response": response}

@app.get("/api/gpt_simulation")
async def get_gpt_simulation(prompt: str):
    # Call the analyze_financial_trends function (no 'await' needed if it's synchronous)
    prompt+= ". Run a short simulation of the aftermath. Then provide pros and cons"
    response = analyze_financial_trends(prompt)  # No 'await' here
    return {"response": response}

