import React from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

const CryptoGrid = ({ data, activeTab, setActiveTab, loading }) => {
  const tabs = [
    { 
      key: 'gainers', 
      label: 'Top Gainers', 
      icon: TrendingUp,
      data: data?.gainers || []
    },
    { 
      key: 'losers', 
      label: 'Top Losers', 
      icon: TrendingDown,
      data: data?.losers || []
    },
    { 
      key: 'top24h', 
      label: 'Top 24h', 
      icon: Clock,
      data: data?.top24h || []
    }
  ];

  const activeData = tabs.find(tab => tab.key === activeTab)?.data || [];

  return (
    <div className="bg-gradient-to-br from-gray-800/90 via-gray-800/95 to-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-600/50 shadow-2xl">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-600/30 bg-gradient-to-r from-gray-700/50 via-gray-600/30 to-gray-700/50 rounded-t-xl">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all duration-300 relative group ${
                activeTab === tab.key 
                  ? 'bg-gradient-to-r from-blue-600/80 via-purple-600/70 to-indigo-600/80 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:via-purple-500/15 hover:to-indigo-500/20 hover:text-white hover:shadow-md'
              } ${tab.key === 'gainers' ? 'rounded-tl-xl' : ''} ${tab.key === 'top24h' ? 'rounded-tr-xl' : ''}`}
              style={{ 
                minWidth: '180px', 
                maxWidth: '220px',
                flex: '0 1 auto'
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="whitespace-nowrap">{tab.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
                activeTab === tab.key 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-600/70 text-gray-300 group-hover:bg-gray-500/70'
              }`}>
                {tab.data.length}
              </span>
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-b-md"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Data Grid */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">
            <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-spin">
              <Clock className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-lg">Loading {tabs.find(tab => tab.key === activeTab)?.label.toLowerCase()}...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the latest data</p>
          </div>
        ) : activeData.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No data available for {tabs.find(tab => tab.key === activeTab)?.label.toLowerCase()}.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeData.map((coin, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-700/60 via-gray-700/80 to-gray-800/60 backdrop-blur-sm rounded-xl p-5 flex justify-between items-center hover:from-gray-600/70 hover:via-gray-600/90 hover:to-gray-700/70 transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50 hover:shadow-lg group">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full w-12 h-12 flex items-center justify-center border border-blue-400/30">
                      <span className="text-blue-300 font-bold text-sm">
                        {coin.symbol.replace('-USD', '').substring(0, 3)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl text-white group-hover:text-blue-100 transition-colors">
                        {coin.symbol.replace('-USD', '')}
                      </h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {coin.interval_minutes}-minute interval
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-mono text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
                    ${coin.current.toFixed(6)}
                  </div>
                  <div className={`text-sm font-semibold flex items-center justify-end space-x-2 ${
                    coin.gain >= 0 ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'
                  } transition-colors`}>
                    <div className={`rounded-full p-1 ${
                      coin.gain >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {coin.gain >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                    </div>
                    <span>
                      {coin.gain >= 0 ? '+' : ''}{coin.gain.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoGrid;
