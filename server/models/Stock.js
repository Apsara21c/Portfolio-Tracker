import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    uppercase: true
  },
  

  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  buyPrice: {
    type: Number,
    required: true,
    min: 0
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Stock', stockSchema);
