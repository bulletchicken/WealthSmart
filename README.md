# 💰🧠 WealthSmart 

![License](https://img.shields.io/badge/license-MIT-blue.svg)  
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)  

---

## 📕 Table of Contents 

- [Overview](#overview)
- [Inspiration](#Inspiration)
- [Techstack](#Techstack)
- [Rationale](#Rationale)
- [Installation](#contact)

---

# Overview

[Quanto Engineering Application] - If everything were just 1s and 0s, the world would be boring—no pop music, no socializing, and definitely no Instagram Reels. These are the things in life that make us, well, human. And that goes for accounting and finance too! It's not all just about the numbers. People have always been influenced because of opinions, creativity, and of course, the latest news! So WealthSmart takes this idea to heart by contextualizing its financial predicitons and analysis with thousands the most recent news articles! This was an additional project I made for the application, and now serves as the take-home assignment.

---

# Inspiration

When I first learned about Quanto during my job hunt, what I really caught my eye was the landing page saying "Stress-Free Financials" and tips for small businesses. Something in my head flickered because my parents run a small business together 🧑‍🧑‍🧒‍🧒 and I always see them up at 2am doing their own accounting on a crappy computer running Microsoft Excel (they pull me in to help out too). So, I dug deeper. I found that Quanto used technologies such as Xero which had a financial forecasting, but did not seem to take into account data from the news.💡! Right there and then, the flickering light bulb went full bright and appeared above my head. Of course knowing me, I hoped right onto VS code to bring my idea to life.

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

*Next.js*
I was running on a time-crunch and Next.js was the fastest path to finishing this project because of its ease of full-stack deployment with vercel (since it was made by them). The modularized structure of it also allowed me to organize the project more efficiently, speeding up development by helping me quickly isolate errors and bugs🪳.

*FastAPI*
FastAPI was perfect for me because of how fast and developer friendly it was, as well as its built-in support for asynchronous operations like fetching real-time news data and processing OpenAI responses. On top of that, being able to use a Python for the backend helped me feel right at home. 

*OpenAI API*
I was very tempted to try out GROK for this project but ChatGPT 4o mini simply excels in every benchmark performanc and is still one of the top models in terms of price to performance and speed. It was the perfect middle ground to Julius.AI's super analytical skills and GROKs talkativeness. 

*AWS S3*
A last minute addition to the project. I couldn't stick with my lazy create-a-local-folder database system when deploying to Vercel since you couldn't write and store new JSON files after deployment. So, I decided to check out some of the lightweight databases AWS has to offer and it was just that. SUPER LIGHT WEIGHT. Uploading and retrieving data using buckets was super fast and efficient. Just had to sacrifice a few meals to get some AWS credits...

*Google Cloud API*
I took an accounting class not too long ago and we made so many income statements, balance sheets, etc. on Google Sheets. I thought this was a great oppurtunity to reuse some of those old skills and data. I also know lots of businesses who use Google Sheets/Microsoft Excel to keep track of their money(such as my parents), and because of that, it makes the WebApp much more accessible to my target audience—small businesses.

*NewsAPI*
Weighed out the pros and cons compared to some of the other web scrappers out there, and this one seems to produce the most specialized results, allowing me to filter by keywords, date, certain publishers, and even provide a break down on who these publishers were. The ease of use with their API also drew me in because I was in a time crunch balancing all my tests out.



---

## Installation

1. npm i
