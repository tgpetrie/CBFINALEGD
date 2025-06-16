import React from 'react';
import { Wifi, WifiOff, Clock } from 'lucide-react';

const ConnectionStatus = ({ isConnected, lastUpdate }) => {
  const formatLastUpdate = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        {isConnected ? (
          <>
            <Wifi className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-400">Connected</span>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5 text-red-400" />
            <span className="text-sm text-red-400">Disconnected</span>
          </>
        )}
      </div>

      {/* Last Update */}
      {lastUpdate && (
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">
            {formatLastUpdate(lastUpdate)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
