const API_BASE_URL = 'http://127.0.0.1:5001';

class CryptoAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Main crypto data with 3-minute intervals
  async getCryptoData() {
    return this.request('/api/crypto');
  }

  // 24-hour top movers for banner
  async getBannerData() {
    return this.request('/api/banner-1h');
  }

  // Historical chart data
  async getChartData(symbol, days = 7) {
    return this.request(`/api/chart/${symbol}?days=${days}`);
  }

  // Top cryptos watchlist
  async getWatchlist() {
    return this.request('/api/watchlist');
  }

  // Market overview
  async getMarketOverview() {
    return this.request('/api/market-overview');
  }

  // Health check
  async getHealth() {
    return this.request('/api/health');
  }

  // Configuration
  async getConfig() {
    return this.request('/api/config');
  }
}

export default new CryptoAPI();
