import express from 'express'; 
import Stock from '../models/Stock.js';
import { getStockPrice } from '../services/stockPrice.js';

const router = express.Router();

// Get all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new stock
router.post('/', async (req, res) => {
  try {
    const { symbol, name, quantity, buyPrice, currentPrice} = req.body;
    
    if (!symbol || !name || !quantity || !buyPrice || !currentPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // let currentPrice = 0; // Default value if fetching price fails

    // try {
    //   // Fetch current stock price (using your stockPrice service)
    //   currentPrice = await getStockPrice(symbol);
    //   if (isNaN(currentPrice) || currentPrice <= 0) {
    //     throw new Error('Invalid stock price received');
    //   }
    // } catch (error) {
    //   console.error('Error fetching stock price:', error);
    //   // If price fetch fails, we set it to 0 and can later update it
    //   currentPrice = 0;
    // }
    console.log("Final current Price",currentPrice)
    const stock = new Stock({
      symbol: symbol.toUpperCase(),
      name,
      quantity: Number(quantity),
      buyPrice: Number(buyPrice),
      currentPrice: Number(currentPrice)// Save currentPrice (either fetched or default)
    });


    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (error) {
    console.error('Error saving stock:', error);
    res.status(400).json({ message: error.message || 'Failed to save stock' });
  }
});

// Update a stock
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { symbol, name, quantity, buyPrice,currentPrice } = req.body;

    // Validation for required fields
    if (!symbol || !name || !quantity || !buyPrice || !currentPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // let currentPrice = 0;

    // Fetch the current price for the stock
    // try {
    //   currentPrice = await getStockPrice(symbol);
    //   if (isNaN(currentPrice) || currentPrice <= 0) {
    //     throw new Error('Invalid stock price received');
    //   }
    // } catch (error) {
    //   console.error('Error fetching stock price:', error);
    //   currentPrice = 0; // Fallback to 0 if price can't be fetched
    // }

    // Update the stock in the database
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { 
        symbol: symbol.toUpperCase(),
        name,
        quantity: Number(quantity),
        buyPrice: Number(buyPrice),
        currentPrice: Number(currentPrice) // Update currentPrice
      },
      { new: true, runValidators: true }
    );

    // Check if the stock was found
    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    // Respond with the updated stock
    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a stock
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStock = await Stock.findByIdAndDelete(id);

    // Check if the stock was found
    if (!deletedStock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    // Respond with a success message
    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
