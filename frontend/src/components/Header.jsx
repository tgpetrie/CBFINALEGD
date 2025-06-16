import React from 'react';
import logo from '../assets/logobro.png'; // Update this path

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center space-x-6 bg-gradient-to-r from-gray-800/50 via-gray-700/30 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-md"></div>
          <img 
            src={logo} 
            alt="BHABIT Logo" 
            className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shadow-lg border-2 border-orange-400/30" 
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl">
            BHABIT
          </h1>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mt-2"></div>
        </div>
      </div>
      <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
        Profits Buy Impulse
      </p>
    </div>
  );
};

export default Header;