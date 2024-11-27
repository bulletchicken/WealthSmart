import requests
import os

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

    # Send the request
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        full_data = response.json()
        
        # Extract titles
        titles = [article.get('title', '[No Title]') for article in full_data.get('articles', [])
                if article.get('title') and article.get('title') != '[Removed]']
            
        print('total_results', full_data.get('totalResults', 0))
            
    return {
        'total_results': full_data.get('totalResults', 0),
        'titles': titles
    }