import openai
import boto3
import json
from botocore.exceptions import ClientError
import os

# OpenAI API Key (replace with your actual API key)
openai.api_key = os.getenv("OPENAI_API_KEY")

# AWS S3 Configuration
BUCKET_NAME = "quantobucket"

# Initialize S3 Client
s3_client = boto3.client(
    "s3",
    region_name='us-west-2',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY") 
)

# Function to retrieve JSON data from S3
def retrieve_from_s3(file_name):
    try:
        response = s3_client.get_object(Bucket=BUCKET_NAME, Key=file_name)
        data = response["Body"].read().decode("utf-8")
        return json.loads(data)
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchKey':
            raise FileNotFoundError(f"Error: {file_name} not found in S3 bucket.")
        else:
            raise Exception(f"Error retrieving {file_name} from S3: {str(e)}")

# Function to make a call to GPT and get a response
def get_gpt_response(prompt: str):
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a financial advisor specializing in helping small businesses make data-driven decisions. Provide advice by talking about the numbers, and connecting the company’s summary and financial data to relevant real-world news given. Make reasonable assumptions, but clearly state when you’re speculating. Use straightforward, easy-to-digest language, and focus on balancing positives (opportunities) and negatives (risks). Relate costs, challenges, and strategies directly to the company’s specific needs. Ensure your advice is actionable and insightful, helping the business grow in today’s market."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.8,
        #avoid 504 gateway timeout :(
        max_tokens=300
        
    )
    return response.choices[0].message.content

# Function to analyze financial trends using data from S3 and GPT
def analyze_financial_trends(message: str):
    try:
        # Retrieve income data and company description from S3
        income_data = retrieve_from_s3("income_data.json")
        company_description = retrieve_from_s3("summary.json")

        # Extract relevant data
        company_info = company_description.get("summary", "No company description available.")
        news_data = company_description.get("scraped_data", "No news data available.")

        # Prepare the full data for GPT
        prompt = (
            f"Company Description: {json.dumps(company_info)}\n\n"
            f"Financial Data: {json.dumps(income_data)}\n\n"
            f"News Data: {json.dumps(news_data)}\n\n"
            f"Message: {message}\n\n"
        )

        # Send the prompt to GPT for analysis
        gpt_response = get_gpt_response(prompt)
        return gpt_response

    except FileNotFoundError as e:
        return f"Error: {str(e)}"
    except Exception as e:
        return f"Unexpected error: {str(e)}"