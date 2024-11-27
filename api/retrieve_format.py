from googleapiclient.discovery import build
import json

RANGE_NAME = 'Sheet1!A1:Z1000'

# Google Cloud API key
API_KEY = '  '

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

def save_dict_to_json(data_dict, filename='data.json'):
    with open(filename, 'w') as json_file:
        json.dump(data_dict, json_file, indent=4)
        

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
        #for key, value in data_dict.items():
        #    print(f'{key}: {value}')
        
        print(data_dict)
        
        save_dict_to_json(data_dict)
        
        
