import { Link, useLocation } from 'react-router-dom';
import { Store, Info } from 'lucide-react';
import React from 'react';

export default function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">TechStore</span>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Info className="h-4 w-4 mr-2" />
              About
            </Link>
            <Link
              to="/products"
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/products'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Store className="h-4 w-4 mr-2" />
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}