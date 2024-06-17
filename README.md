# Cryptocurrency Arbitrage Dashboard

This project is a web-based dashboard that displays the historical values of several cryptocurrencies and provides arbitrage suggestions using those cryptocurrencies, with at least one stablecoin as the base.

## Features

- Displays historical data for selected cryptocurrencies
- Provides arbitrage opportunities based on the fetched data
- User-friendly dashboard with a chart for visualizing historical prices
- Implements caching to handle API rate limits and ensure data availability

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/cryptocurrency-arbitrage-dashboard.git
   cd cryptocurrency-arbitrage-dashboard
2. **Backend setup:**
    ```sh
    cd backend
    npm install
    npm run dev
2. **Frontend setup:**
    ```sh
    cd frontend
    npm install
    npm start

## Usage
1. **Backend:**
- Runs on http://localhost:4000
- Provides APIs to fetch historical data and arbitrage opportunities
2. **Frontend:**
- Runs on http://localhost:3000
- Displays the historical data and arbitrage opportunities on the dashboard
3. **API Endpoints**
- Fetches historical data for the specified coin over the given number of days: GET /api/historical?coin=<coin>&days=<days>
- Fetches arbitrage opportunities based on the current market data: GET /api/arbitrage

## Approach
**Backend:**
- Used Node.js and Express to set up the server.
- Created services to fetch data from the CoinGecko API.
- Implemented a model to process the fetched data and calculate arbitrage opportunities.
  
**Frontend:**
- Developed using React and Chart.js to visualize the data.
- Created a user interface to select cryptocurrencies and view their historical prices.
  
**API Calls:**
- Historical data and ticker information are fetched from the CoinGecko API.

## Issues on Arbitrage Recommendations
### API Rate Limits
The free tier of the CoinGecko API limits the number of API calls to 5-15 per minute depending on global use.This restricts the amount of data that can be fetched and processed, impacting the completeness of the arbitrage suggestions.

### Stablecoin Data
Since the original goal for the arbitrage is to create trading recommendations in the structure of stable coin -> coin -> coin -> stable coin etc., we need tickers consisting of stable coin-> coin conversions. However, 
the stable coin data retrieved mostly consists of conversions between stable coins (stable coin -> stable coin). This limits the ability to generate meaningful arbitrage paths involving non-stable cryptocurrencies.
<br><br>
With only 100 tickers per page or API call being returned, there is not enough diversified tickers for stable coin -> coin conversions to generate arbitrage permutations and making more API calls leads to consistently hitting the rate limit (status 429 errors).
As such, the arbitrage recommendations is not implemented on the frontend.
<br><br>
Screenshots of the data fetched can be seen in the screenshots folder.

### Inconsistent Data
The API returns data with inconsistent base and target values, sometimes using coin IDs and other times using symbols. One example would be base:'ethereum' and target:'ETH'.
This required additional processing to standardize the data for calculations by using maps.





