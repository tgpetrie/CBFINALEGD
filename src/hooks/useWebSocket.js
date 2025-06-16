import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const useWebSocket = (url = 'http://127.0.0.1:5001') => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(url, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });

    // Connection events
    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Connected to CBMo4ers backend WebSocket');
    });

    socketRef.current.on('disconnect', (reason) => {
      setIsConnected(false);
      console.log('❌ Disconnected from WebSocket:', reason);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    });

    // Listen for crypto data updates
    socketRef.current.on('crypto_update', (newData) => {
      console.log('📊 Received crypto update:', newData);
      setData(newData);
      setLastUpdate(new Date());
    });

    // Listen for initial data on connect
    socketRef.current.on('initial_data', (initialData) => {
      console.log('🚀 Received initial data:', initialData);
      setData(initialData);
      setLastUpdate(new Date());
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);

  return { 
    data, 
    isConnected, 
    lastUpdate,
    socket: socketRef.current 
  };
};
