import React from 'react';
import './Banner.css';

const Banner = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto whitespace-nowrap mb-6 py-2 px-4 bg-gradient-to-r from-purple-800/10 to-blue-800/10 rounded-xl border border-white/5 shadow-sm">
        <h2 className="text-sm uppercase text-purple-300 tracking-wide mb-2">
          Loading 24h top movers...
        </h2>
        <div className="flex space-x-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="px-4 py-2 bg-purple-900/20 rounded-md hover:bg-purple-900/30 transition text-xs">
              <span className="text-blue-300">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden whitespace-nowrap mb-6 py-2 px-4 bg-gradient-to-r from-purple-800/10 to-blue-800/10 rounded-xl border border-white/5 shadow-sm">
      <h2 className="text-sm uppercase text-purple-300 tracking-wide mb-2">
        Top 24h Gainers - Live Data
      </h2>
      <div className="banner-scroll">
        {data.concat(data).map((coin, index) => (
          <div key={index} className="banner-item">
            <span className="symbol">{coin.symbol.replace('-USD', '')}</span>
            <span className="price">${coin.current_price.toFixed(4)}</span>
            <span className={`change ${coin.price_change_24h >= 0 ? 'positive' : 'negative'}`}>
              {coin.price_change_24h >= 0 ? '+' : ''}
              {coin.price_change_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
