import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Navbar = () => {

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Store name link */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Product Store
            </Link>
          </div>
          
          {/* Right: Plus icon button with link */}
          <div className="flex items-center space-x-4">
            <Link
              to="/create"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center"
              title="Add Product"
            >
              <FaPlus className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;