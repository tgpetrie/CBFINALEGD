import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CryptoAPI from '../services/api';

const Charts = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC-USD');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChartData(selectedSymbol);
  }, [selectedSymbol]);

  const fetchChartData = async (symbol) => {
    setLoading(true);
    try {
      const response = await CryptoAPI.getChartData(symbol, 7);
      setChartData(response.chart_data || []);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price > 1 ? price.toFixed(2) : price.toFixed(6);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Price Chart</h3>
        <select 
          value={selectedSymbol} 
          onChange={(e) => setSelectedSymbol(e.target.value)}
          className="bg-gray-700 text-white rounded px-2 py-1 border border-gray-600"
        >
          <option value="BTC-USD">Bitcoin</option>
          <option value="ETH-USD">Ethereum</option>
          <option value="SOL-USD">Solana</option>
          <option value="ADA-USD">Cardano</option>
          <option value="DOT-USD">Polkadot</option>
        </select>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-gray-400">Loading chart...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="datetime" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              stroke="#9CA3AF"
            />
            <YAxis 
              tickFormatter={formatPrice}
              stroke="#9CA3AF"
            />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value) => [`$${formatPrice(value)}`, 'Price']}
              contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '6px' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Charts;
