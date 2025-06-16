import React from 'react';

const TopGainersBanner = ({ data }) => {
  if (!data || data.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div className="overflow-hidden mb-8 bg-gradient-to-r from-purple-800/20 via-blue-800/20 to-indigo-800/20 backdrop-blur-sm rounded-2xl border border-purple-400/30 shadow-2xl">
      <div className="bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-indigo-600/30 px-6 py-3 border-b border-purple-400/20">
        <h2 className="text-lg font-bold text-purple-200 tracking-wide flex items-center space-x-2">
          <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></span>
          <span>Top 24h Volume Movers</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-1 p-4 animate-scroll">
          {data.slice(0, 15).map((coin, i) => (
            <div key={i} className="flex-shrink-0 min-w-[160px] px-4 py-3 bg-gradient-to-br from-gray-700/60 to-gray-800/60 backdrop-blur-sm rounded-xl hover:from-gray-600/70 hover:to-gray-700/70 transition-all duration-300 border border-gray-600/30 hover:border-purple-400/40 hover:shadow-lg group cursor-pointer">
              <div className="text-center">
                <div className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                  {coin.symbol.replace('-USD', '')}
                </div>
                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors mt-1">
                  ${coin.current.toFixed(4)}
                </div>
                <div className={`text-sm font-semibold mt-1 ${
                  coin.gain >= 0 ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'
                } transition-colors`}>
                  {coin.gain >= 0 ? '+' : ''}{coin.gain.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGainersBanner;