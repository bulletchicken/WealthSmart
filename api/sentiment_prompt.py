import requests
import json
import boto3
from botocore.exceptions import ClientError
import os

# AWS S3 Configuration
BUCKET_NAME = "quantobucket"

# Initialize S3 Client
s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY") 
)

# Function to upload JSON data to S3
def upload_to_s3(data, file_name):
    try:
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=file_name,
            Body=json.dumps(data),
            ContentType="application/json"
        )
        print(f"Uploaded {file_name} to S3.")
    except ClientError as e:
        print(f"Failed to upload {file_name} to S3: {e}")

# Function to scrape news and upload to S3
async def scrape(query: str):
    # NewsAPI request
    news_key = os.environ.get("NEWS_API_KEY")
    url = (
        f'https://newsapi.org/v2/everything?'
        f'q={query}&'
        f'sortBy=popularity&'
        #newsapi apikey
        f'apiKey={news_key}'
        
    )

    # Initialize full_data as an empty dictionary
    full_data = {}

    # Send the request
    try:
        response = requests.get(url)
        if response.status_code == 200:
            # Parse the JSON response
            full_data = response.json()

            # Extract titles
            titles = [
                article.get('title', '[No Title]')
                for article in full_data.get('articles', [])
                if article.get('title') and article.get('title') != '[Removed]'
            ]

            # Create the structured result
            result = {
                'total_results': full_data.get('totalResults', 0),
                'titles': titles
            }

            # Upload the result to S3
            upload_to_s3(result, f"news_articles.json")

            return result
        else:
            print(f"Failed to fetch news for query: {query}, status_code: {response.status_code}")
            return {
                'total_results': 0,
                'titles': []
            }
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while making the API request: {e}")
        return {
            'total_results': 0,
            'titles': []
        }