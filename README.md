## 💰🧠 WealthSmart 

![License](https://img.shields.io/badge/license-MIT-blue.svg)  
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)  

---

## Demo Video https://www.youtube.com/watch?v=Dm4aF0I6Khg

## 📕 Table of Contents 

- [Overview](#overview)
- [Inspiration](#Inspiration)
- [Features](#Features)
- [Techstack](#Techstack)
- [Rationale](#Rationale)
- [Limitations](#Limitations)
- [Installation](#Installation)

---

# Overview

![](https://github.com/bulletchicken/WealthSmart/blob/main/public/how-it-works.gif)

[**Quanto Engineering Application**] - If everything were just 1s and 0s, the world would be boring—no pop music, no socializing, and definitely no Instagram Reels😦. These are the things in life that make us, well, human. And that goes for accounting and finance too! It's not all just about the numbers. People have always been influenced because of opinions, creativity, and of course, the latest news! So WealthSmart takes this idea to heart by contextualizing its financial predicitons and analysis with thousands the most recent news articles! This was an additional project I made for the application, and now serves as the take-home assignment.

---

# Inspiration

When I first learned about Quanto during my job hunt, what I really caught my eye was the landing page saying "Stress-Free Financials" and followed by tips for small businesses. Something in my head flickered because my parents run a small business together 🧑‍🧑‍🧒‍🧒 and I always see them up at 2am doing their own accounting on a crappy computer running Microsoft Excel (they pull me in to help out too). So, I dug deeper. I found that Quanto used technologies such as Xero which had a financial forecasting service, but did not seem to take into account data from the news.💡! Right there and then, the flickering light bulb went full bright and appeared above my head. Of course knowing me, I hoped right onto VS code to bring my idea to life.

---
# Features

Sorted by coolest to least cool:
1. **DIY RAG framework for supercharging the AI:** Contextualizing the AI was the main idea of this project. Giving it both context based off of news headlines and a user's company summary to help supercharge and sculpt the AI's analysis. At first, I thought ChatGPT already had access to the internet but it kept yelling at me whenever I tried to feed it links. So, to feed it knowledge on latest trends, I used NewsAPI to scrape the articles, Google Sheets API to scrape income statement data, a personal user summary, and GPT4o-mini to hold it all together.
2. **AWS Cloud Database:** Something about using the s3 removed all the horrendous memories I've had with cloud databases because of how simple it was. And for that, I would rank it number 2. It might not be a cool feature, but it sure is a cool technology. Maybe Quanto could use it to store client data and profiles!
3. **Google Sheets Scrape and Clean:** Might look like a simple feature, but was proved to be the most problematic. When going through income statements, I quickly realized, so many different potential variation for expense and revenue titles that it made it hard to depict between the two. But after a long long time trying to develop an algorithm to look properly go through the data, I realized I can just divide the data using the headers that universally exist on income statements!
4. **GIFS for page loaders**
5. **Animated Counter for the number of news articles found**
6. **Overall polish & design**

---

# Techstack

**Stars of the Show**
- ⚡ **Next.js**: For building a modern, full-stack web app
- ✨ **FastAPI**: For building a high-performance backend with Python.

**Stars, but kinda like the Side Characters**
- 🚀 **OpenAI API**: To power AI-driven features like text generation and sentiment analysis.
- ☁️ **AWS S3(Boto3 & Botocore)**: To upload, store, and retrieve generated & scraped data
- 💾 **Google Cloud API**: For seamless integration with Google services and google sheets.
- 📰 **NewsAPI**: For fetching and analyzing the latest news articles.
- 📦 **Pydantic**: For data validation and settings management.

---

# Rationale

**Next.js**
I was running on a time-crunch and Next.js was the fastest path to finishing this project because of its ease of full-stack deployment with vercel (since it was made by them). The modularized structure of it also allowed me to organize the project more efficiently, speeding up development by helping me quickly isolate errors and bugs🪳.

**FastAPI**
FastAPI was perfect for me because of how fast and developer friendly it was, as well as its built-in support for asynchronous operations like fetching real-time news data and processing OpenAI responses. On top of that, being able to use a Python for the backend helped me feel right at home. 

**OpenAI API**
I was very tempted to try out GROK for this project but ChatGPT 4o mini simply excels in every benchmark performanc and is still one of the top models in terms of price to performance and speed. It was the perfect middle ground to Julius.AI's super analytical skills and GROKs talkativeness. 

**AWS S3**
A last minute addition to the project. I couldn't stick with my lazy create-a-local-folder database system when deploying to Vercel since you couldn't write and store new JSON files after deployment. So, I decided to check out some of the lightweight databases AWS has to offer and it was just that. SUPER LIGHT WEIGHT. Uploading and retrieving data using buckets was super fast and efficient. Just had to sacrifice a few meals to get some AWS credits...

**Google Cloud API**
I took an accounting class not too long ago and we made so many income statements, balance sheets, etc. on Google Sheets. I thought this was a great oppurtunity to reuse some of those old skills and data. I also know lots of businesses who use Google Sheets/Microsoft Excel to keep track of their money(such as my parents), and because of that, it makes the WebApp much more accessible to my target audience—small businesses.

**NewsAPI**
Weighed out the pros and cons compared to some of the other web scrappers out there, and this one seems to produce the most specialized results, allowing me to filter by keywords, date, certain publishers, and even provide a break down on who these publishers were. The ease of use with their API also drew me in because I was in a time crunch balancing all my tests out.

---

# Limitations

1. max_tokens: Currently the biggest struggle with WealthSmart is minimizing how long it takes to respond to the user. I also had to set a max number of tokens that can be requested from ChatGPT before hitting a 504 gateway error. With a limited amount, often time responses would get cut off and not cover the entire scope of providing feedback, connecting it to real world news, etc. .

2. Spreadsheet Titles: The original idea was to use Google Cloud's NLP to perform a semantic search to identify wether a title should be classified as an expense or income. However,that was no longer viable after the long process times as well as extra development costs. So as a substitute, there is a long array of potential titles for expenses and income that is used to classify them when producing the graphs.
   
3. Headlines only: While the NewsAPI was able to scrape thousands of headlines and url to news articles, testing with different APIs to actually access these URLs showed to be too troublesome in its formating, and takes too much time to get back to the user. Another problem I found with this was that there would be too many tokens being fed into ChatGPT adding even more time, and a lot of these articles were a bit off topic, skewing the advice the AI gives.

---

# Installation

1. Clone the Repo
```sh
git clone https://github.com/bulletchicken/WealthSmart
```

2. Install NPM packages
```sh
npm install 
```

3. Export Environment Variables
```sh
export OPENAI_API_KEY=""
export NEWS_API_KEY=""
export CLOUD_API_KEY=""
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
```

4. Backend Setup (FastAPI)
```sh
uvicorn index:app --reload
```

5. Run Development (Next.js)
```sh
npm run dev
```
