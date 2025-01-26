import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Stock, PortfolioMetrics } from '../types/stock';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface DashboardProps {
  stocks: Stock[];
  metrics: PortfolioMetrics;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const Dashboard: React.FC<DashboardProps> = ({ stocks, metrics }) => {
  const pieData = stocks.map((stock) => ({
    name: stock.symbol,
    value: stock.quantity * stock.currentPrice,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" style={{ backgroundColor: '#1C1C1C' }}>
      <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#fff' }}>
          Portfolio Overview
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 bg-blue-800 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="text-blue-500" />
              <span className="text-sm text-gray-300">Total Value</span>
            </div>
            <p className="text-2xl font-semibold text-blue-200">
              ${metrics.totalValue.toFixed(2)}
            </p>
          </div>
          <div className="p-5 bg-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              {metrics.totalGainLoss >= 0 ? (
                <TrendingUp className="text-green-500" />
              ) : (
                <TrendingDown className="text-red-500" />
              )}
              <span className="text-sm text-gray-300">Total Gain/Loss</span>
            </div>
            <p
              className={`text-2xl font-semibold ${
                metrics.totalGainLoss >= 0 ? 'text-green-200' : 'text-red-200'
              }`}
            >
              ${Math.abs(metrics.totalGainLoss).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#fff' }}>
          Portfolio Distribution
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
