from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .retrieve_format import scrape_clean
from .mastermind import analyze_financial_trends
from pydantic import BaseModel
from .sentiment_prompt import scrape
import re
import boto3
import json
from botocore.exceptions import ClientError
import os

# Initialize FastAPI
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

# AWS S3 Configuration
BUCKET_NAME = "quantobucket"

# Initialize S3 Client
s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY") 
)

# Function to extract the Google Sheet ID
def extract_google_sheet_id(url: str):
    match = re.search(r"/d/([a-zA-Z0-9-_]+)", url)
    if match:
        return match.group(1)
    return None

# Pydantic models for request body
class MessageRequest(BaseModel):
    url: str
    
class SummaryRequest(BaseModel):
    key_words: str
    summary: str

# Function to upload JSON data to S3
def upload_to_s3(data, file_name):
    try:
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=file_name,
            Body=json.dumps(data),
            ContentType="application/json"
        )
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload to S3: {str(e)}")

# Function to retrieve JSON data from S3
def retrieve_from_s3(file_name):
    try:
        response = s3_client.get_object(Bucket=BUCKET_NAME, Key=file_name)
        data = response["Body"].read().decode("utf-8")
        return json.loads(data)
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchKey':
            raise HTTPException(status_code=404, detail="File not found in S3")
        else:
            raise HTTPException(status_code=500, detail=f"Failed to retrieve from S3: {str(e)}")

@app.post("/api/py/post_data")
async def post_data(request: MessageRequest):
    sheet_id = extract_google_sheet_id(request.url)
    if not sheet_id:
        raise HTTPException(status_code=400, detail="Invalid Google Sheets URL")
    
    scrape_clean(sheet_id)

    return {"message": "Data processed and uploaded successfully"}

@app.post("/api/py/post_context")
async def post_context(company: SummaryRequest):
    summary_data = {
        "summary": company.summary,
    }
    
    # Save summary data to S3
    upload_to_s3(summary_data, "summary.json")
    
    # Scrape articles based on keywords
    cleaned_articles = await scrape(company.key_words)

    upload_to_s3(json.dumps(cleaned_articles), "cleaned_articles.json")
    
    total_results = cleaned_articles.get("total_results", 0)
    
    # Return the total results from the scraped data
    print("total_results", total_results)
    return {"total_results": total_results}

@app.get("/api/py/get_data")
async def get_data():
    # Retrieve income data from S3
    data = retrieve_from_s3("income_data.json")
    return data

@app.get("/api/py/gpt_trends")
async def get_gpt_response():
    response = analyze_financial_trends("In point form, analyze the top 3 trends between the companies' financial data and use real-world data/news to establish correlations and recommendations. Clearly specify the numbers, their context, and what they represent. If necessary, create assumptions, but explicitly state that they are hypothetical. Factor in the time of year and its potential impact on the analysis. Use emojis occasionally.")
    return {"response": response}

@app.get("/api/py/gpt_simulation")
async def get_gpt_simulation(prompt: str):
    prompt += ". Run a short simulation of the aftermath. Then provide pros and cons."
    response = analyze_financial_trends(prompt)
    return {"response": response}