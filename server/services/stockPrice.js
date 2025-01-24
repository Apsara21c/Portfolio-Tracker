import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from the .env file

const apiKey = process.env.VITE_API_KEY;  // Use process.env to access the API key

/**
 * Fetch the current stock price using Alpha Vantage API.
 * @param {string} symbol - The stock symbol to fetch the price for.
 * @returns {Promise<number>} - The current stock price or 0 if unavailable.
 */
export async function getStockPrice(symbol) {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    );

    if (response.data['Global Quote'] && response.data['Global Quote']['05. price']) {
      const price = response.data['Global Quote']['05. price'];
      console.log(`Fetched price for ${symbol}: ${price}`); // Log the fetched price
      return parseFloat(price);
    }

    console.log(`No price found for ${symbol}, returning 0`);
    return 0; // Default price if API fails
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return 0; // Default price on error
  }
}
