import React from 'react';

const GainersList = ({ gainers }) => {
  if (!gainers || gainers.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-white/5 rounded-2xl shadow-inner hover:shadow-md transition">
      <h2 className="text-xl text-orange-400 mb-3">Top Gainers</h2>
      <ul className="space-y-2">
        {gainers.slice(0, 13).map((coin, i) => (
          <li key={i} className="flex justify-between text-sm text-white/80 hover:text-white">
            <span>#{i + 1} {coin.symbol.replace('-USD', '')}</span>
            <span className="text-green-400">+{coin.gain.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GainersList;
