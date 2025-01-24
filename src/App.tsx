import  { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { StockList } from './components/StockList';
import { StockForm } from './components/StockForm';
import { Stock, PortfolioMetrics } from './types/stock';
import { Plus } from 'lucide-react';
import { api } from './services/api';
// import {getStock} from '../server/services'







function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const response = await api.getStocks();
      setStocks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stocks');
      console.error('Error fetching stocks:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (stocks: Stock[]): PortfolioMetrics => {
    const totalValue = stocks.reduce(
      (sum, stock) => sum + (stock.currentPrice || 0) * (stock.quantity || 0),
      0
    );

    const totalGainLoss = stocks.reduce(
      (sum, stock) =>
        sum + ((stock.currentPrice || 0) - (stock.buyPrice || 0)) * (stock.quantity || 0),
      0
    );

    const stockPerformances = stocks.map((stock) => ({
      ...stock,
      performance: ((stock.currentPrice || 0) - (stock.buyPrice || 0)) / (stock.buyPrice || 1),
    }));

    const topPerformer = stockPerformances.length > 0
      ? stockPerformances.reduce((prev, current) =>
          prev.performance > current.performance ? prev : current
        )
      : null;

    const worstPerformer = stockPerformances.length > 0
      ? stockPerformances.reduce((prev, current) =>
          prev.performance < current.performance ? prev : current
        )
      : null;

    return {
      totalValue,
      totalGainLoss,
      topPerformer,
      worstPerformer,
    };
  };
  const handleSubmit = async (stockData: Partial<Stock>) => {
    try {
      if (!stockData.symbol || !stockData.name || !stockData.quantity || !stockData.buyPrice || !stockData.currentPrice) {
        setError('All fields are required');
        return;
      }
  
      // Fetch the current price if not provided
      const currentPrice = stockData.currentPrice;
      console.log("HIIIIIIIIIIIIIIIIIIIII",currentPrice)
  
      console.log('Submitting stock data:', { ...stockData, currentPrice });
  
      if (editingStock) {
        await api.updateStock(editingStock._id, { ...stockData, currentPrice });
      } else {
        await api.addStock({ ...stockData, currentPrice });
      }
  
      await fetchStocks();
      setShowForm(false);
      setEditingStock(undefined);
      setError(null);
    } catch (err) {
      console.error('Error saving stock:', err);
      setError(`Failed to save stock: ${err || 'Unknown error'}`);
    }
  };
  
  
  
 
  
  
  const handleEdit = (stock: Stock) => {
    setEditingStock(stock);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteStock(id);
      await fetchStocks();
      setError(null);
    } catch (err) {
      console.error('Error deleting stock:', err);
      setError('Failed to delete stock');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Portfolio Tracker
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Stock
          </button>
        </div>

        <Dashboard stocks={stocks} metrics={calculateMetrics(stocks)} />

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
          <StockList
            stocks={stocks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {showForm && (
          <StockForm
            stock={editingStock}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingStock(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;