import React from 'react';

const LosersList = ({ losers }) => {
  if (!losers || losers.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-white/5 rounded-2xl shadow-inner hover:shadow-md transition">
      <h2 className="text-xl text-red-400 mb-3">Top Losers</h2>
      <ul className="space-y-2">
        {losers.slice(0, 13).map((coin, i) => (
          <li key={coin.symbol} className="flex justify-between text-sm text-white/80 hover:text-white">
            <span>#{i + 1} {coin.symbol.replace('-USD', '')}</span>
            <span className="text-red-400">{coin.gain.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LosersList;
