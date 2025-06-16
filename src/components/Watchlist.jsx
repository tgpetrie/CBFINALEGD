import React, { useState, useEffect } from 'react';
import CryptoAPI from '../services/api';

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlistData();
  }, []);

  const fetchWatchlistData = async () => {
    try {
      const response = await CryptoAPI.getWatchlist();
      setWatchlistData(response?.data || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h3 className="text-lg font-semibold mb-4 text-white">Watchlist</h3>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <h3 className="text-lg font-semibold mb-4 text-white">Top Cryptos</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {watchlistData.slice(0, 10).map((coin, index) => (
          <div key={index} className="bg-gray-700 rounded p-2 flex justify-between items-center hover:bg-gray-600 transition-colors">
            <div>
              <div className="font-medium text-white">{coin.symbol}</div>
              <div className="text-xs text-gray-400">{coin.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-white">${coin.current_price.toFixed(4)}</div>
              <div className={`text-xs ${
                coin.price_change_24h_percent >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {coin.price_change_24h_percent >= 0 ? '+' : ''}
                {coin.price_change_24h_percent.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
