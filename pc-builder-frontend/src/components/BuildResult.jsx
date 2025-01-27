import React from "react";
import { Search, ShoppingCart } from "lucide-react"; // Import search icons

const BuildResult = ({ build, onGoBack }) => {
    // Generate search URLs
    const generateSearchUrls = (partName) => {
        // Encode the part name for URL safety
        const encodedPartName = encodeURIComponent(partName);
        
        return {
            google: `https://www.google.com/search?q=${encodedPartName}+buy+price`,
            amazon: `https://www.amazon.com/s?k=${encodedPartName}`
        };
    };

    if (!build) {
      return (
        <div className="text-center text-lg mt-5 bg-white shadow-md rounded-lg p-6">
          Loading build details...
        </div>
      );
    }
  
    const { budget, total_price, build_details } = build;

    // Change styling if over budget
    const isPriceOverBudget = parseFloat(total_price) > parseFloat(budget);
    const priceTextColor = isPriceOverBudget 
      ? "text-red-600 font-bold" 
      : "text-green-600";

    return (
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Your Recommended PC Build
        </h1>
  
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Budget</h3>
            <p className="text-xl font-bold text-blue-600">${budget}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Price</h3>
            <p className={`text-xl font-bold ${priceTextColor}`}>
            ${total_price}
              {isPriceOverBudget && (
                <p className="text-sm text-gray-600">
                (Over Budget)
                </p>
              )}
            </p>
          </div>
        </div>
  
        <h2 className="text-xl font-semibold text-gray-700 mt-4 mb-4">
          Recommended Parts:
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(build_details).map(([key, value]) => {
            // Generate search URLs for this part
            const searchUrls = generateSearchUrls(value);

            return (
              <div 
                key={key} 
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300 flex items-center justify-between"
              >
                <div>
                  <strong className="text-gray-700 block mb-1">{key}:</strong> 
                  <span className="text-gray-900">{value}</span>
                </div>
                
                {/* Search Icons Container */}
                <div className="flex items-center space-x-2">
                  {/* Google Search Icon */}
                  <a 
                    href={searchUrls.google} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition duration-200 hover:scale-110"
                    title="Search on Google"
                  >
                    <Search size={20} />
                  </a>
                  
                  {/* Amazon Search Icon */}
                  <a 
                    href={searchUrls.amazon} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-600 transition duration-200 hover:scale-110"
                    title="Search on Amazon"
                  >
                    <ShoppingCart size={20} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
  
        <div className="mt-6 flex justify-center">
          <button
            onClick={onGoBack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  };

export default BuildResult;