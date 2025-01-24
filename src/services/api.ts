import axios from 'axios';
import { Stock } from '../types/stock';

const API_URL = 'http://localhost:5000/api';

// Function to get the current stock price (can be from any API)
const getStockPrice = async (symbol: string): Promise<number> => {

  console.log("Akash HIiiii")
  // try {
  //   // Replace this with any stock price API of your choice, e.g., Alpha Vantage, Yahoo Finance, etc.
  //   const response = await axios.get(`https://api.example.com/stock-price?symbol=${symbol}`);
  //   return response.data.price; // Example response format
  // } catch (error) {
  //   console.error('Error fetching stock price:', error);
  //   return 0; // Fallback to 0 if the API call fails
  // }

  return 200;
};

const api = {
  getStocks: () => axios.get<Stock[]>(`${API_URL}/stocks`),

  addStock: async (stock: Partial<Stock>) => {
    try {
      // Fetch the current price before sending the data to the backend
      // const currentPrice = await getStockPrice(stock.symbol?.toUpperCase() || '');
       console.log("ADD Function",stock.currentPrice)
       console.log("Add quantity",stock.quantity)
      const stockData = {
        symbol: stock.symbol?.toUpperCase(),
        name: stock.name,
        quantity: Number(stock.quantity),
        buyPrice: Number(stock.buyPrice),
        currentPrice: stock.currentPrice || 300, // Add currentPrice to the stock data
      };

      // Make the POST request to add the stock
      console.log("Overall Data",stockData)
      return axios.post<Stock>(`${API_URL}/stocks`, stockData);
    } catch (error) {
      console.error('Error adding stock:', error);
      throw error;
    }
  },

  updateStock: (id: string, stock: Partial<Stock>) => 
    axios.put<Stock>(`${API_URL}/stocks/${id}`, stock),

  deleteStock: (id: string) => axios.delete(`${API_URL}/stocks/${id}`)
};

export { api };
