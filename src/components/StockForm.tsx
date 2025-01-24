import React, { useState, useEffect } from 'react';
import { Stock } from '../types/stock';
import { X } from 'lucide-react';

interface StockFormProps {
  stock?: Stock;
  onSubmit: (stock: Partial<Stock>) => void;
  onClose: () => void;
}

export const StockForm: React.FC<StockFormProps> = ({
  stock,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<Stock>>({
    symbol: '',
    name: '',
    quantity: 1,
    buyPrice: 0,
    currentPrice:20
    
  });

  useEffect(() => {
    if (stock) {
      setFormData(stock);
    }
  }, [stock]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.symbol || !formData.name || !formData.quantity || !formData.buyPrice || !formData.currentPrice) {
        alert('Please fill in all fields');
        return;
      }

      console.log("Current Price",formData.currentPrice)
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add stock. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {stock ? 'Edit Stock' : 'Add Stock'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="symbol"
                className="block text-sm font-medium text-gray-700"
              >
                Symbol
              </label>
              <input
                type="text"
                id="symbol"
                value={formData.symbol || ''}
                onChange={(e) =>
                  setFormData({ ...formData, symbol: e.target.value.toUpperCase() })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={formData.quantity || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value),
                  })
                }
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="buyPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Buy Price
              </label>
              <input
                type="number"
                id="buyPrice"
                value={formData.buyPrice || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buyPrice: parseFloat(e.target.value),
                  })
                }
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="currentPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Current Price
              </label>
              <input
                type="number"
                id="currentPrice"
                value={formData.currentPrice || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentPrice: parseInt(e.target.value),
                  })
                }
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {stock ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};