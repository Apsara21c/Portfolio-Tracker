import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import stockRoutes from './routes/stocks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stocks', stockRoutes);

// MongoDB connection with proper options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});