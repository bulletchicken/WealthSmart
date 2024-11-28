import boto3
import json
from googleapiclient.discovery import build
import os

RANGE_NAME = 'Sheet1!A1:Z1000'

# Google Cloud API key
API_KEY = os.getenv("CLOUD_API_KEY")
# S3 bucket name
S3_BUCKET_NAME = "quantobucket"  # Your S3 bucket name


# Initialize S3 client with explicit credentials
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY") 
)

def authenticate_sheets(api_key):
    return build('sheets', 'v4', developerKey=api_key).spreadsheets()

def find_row_by_value(values, search_value):
    clean_data(values)
    for i, row in enumerate(values):
        if row and row[0] == search_value:
            return i, row 
    return None, None

def clean_data(row):
    # Remove empty values from the row
    return [value for value in row if value != ""]

def create_key_value_dict(values):
    data_dict = {}
    for row in values:
        if row and len(row) > 1:  # Ensure the row has more than one value
            print(row[0])
            if(row[0]!=""):
                key = row[0]  # First column value
                row = clean_data(row)  # Clean the row data
                value = row[1:]  # Rest of the row
                data_dict[key] = value
    return data_dict

def save_dict_to_s3(data_dict, bucket_name, file_name):
    # Convert the dictionary to JSON
    
    # Upload the JSON data to the specified S3 bucket using put_object
    try:
        s3_client.put_object(Body=json.dumps(data_dict, indent=4), Bucket=bucket_name, Key=file_name)
        print(f"Data successfully uploaded to {bucket_name}/{file_name}")
    except Exception as e:
        print(f"Failed to upload to S3: {e}")
        

# Main function
def scrape_clean(SPREADSHEET_ID):
    sheets = authenticate_sheets(API_KEY)
    result = sheets.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
    else:
        data_dict = create_key_value_dict(values)
        print("Key-Value Data Dictionary:")
        print(data_dict)
        
        # Save the data to S3 (quantobucket)
        save_dict_to_s3(data_dict, S3_BUCKET_NAME, "income_data.json")