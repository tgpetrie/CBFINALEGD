import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './components/Header';
import GainersList from './components/GainersList';
import LosersList from './components/LosersList';
import TopGainersBanner from './components/TopGainersBanner';
import CryptoGrid from './components/CryptoGrid';

export default function App() {
  const [data, setData] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [activeTab, setActiveTab] = useState('gainers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'http://localhost:5001/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the important 3-minute data first
        const cryptoResponse = await axios.get(`${apiUrl}/crypto`);
        console.log('3-minute crypto data:', cryptoResponse.data);
        setData(cryptoResponse.data);
        setError(null);
        setLoading(false); // Stop loading once main data is loaded
        
        // Try to fetch banner data in background (non-blocking)
        try {
          const bannerResponse = await axios.get(`${apiUrl}/banner-1h`);
          console.log('24-hour banner data:', bannerResponse.data);
          setBannerData(bannerResponse.data);
        } catch (bannerErr) {
          console.log('Banner data unavailable:', bannerErr.message);
          setBannerData({ banner: [] });
        }
        
      } catch (err) {
        console.error('Error fetching main crypto data:', err);
        setError('Failed to fetch crypto data');
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 30 seconds for stable live updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Remove the loading page: always render the main UI

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative overflow-x-hidden">
      {/* Glossy black-purple gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-900 to-black opacity-95" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-purple-700/40 via-transparent to-indigo-900/30 blur-2xl mix-blend-lighten" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header />
        
        {/* Banner */}
        {bannerData && bannerData.banner && bannerData.banner.length > 0 && (
          <TopGainersBanner top24h={bannerData.banner} />
        )}
        
        {/* Main Content - Tabbed Interface */}
        <CryptoGrid data={data} activeTab={activeTab} setActiveTab={setActiveTab} loading={loading} />
        
        {/* Live update indicator */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Live updates every 30 seconds • 3-minute intervals
          </p>
        </div>
      </div>
    </div>
  );
}
