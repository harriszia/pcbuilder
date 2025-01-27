import React, { useState } from "react";
import { HelpCircle } from "lucide-react";

// eslint-disable-next-line
const PerformanceTierTooltip = () => {
  const performanceTierInfo = {
    low: {
      description: "Suitable for basic tasks like web browsing, office work, and light productivity.",
      examples: "Ideal for: Email, word processing, spreadsheets, light web browsing"
    },
    mid: {
      description: "Perfect for gaming, content creation, and demanding professional applications.",
      examples: "Great for: Moderate gaming, photo/video editing, programming"
    },
    high: {
      description: "Top-tier performance for intensive tasks like 4K gaming, 3D rendering, and professional workstations.",
      examples: "Best for: High-end gaming, 3D animation, video production, scientific computing"
    }
  };

  return (
    <div className="absolute z-10 w-64 p-4 bg-white shadow-lg rounded-lg border border-gray-200 text-sm">
      <h4 className="font-bold mb-2 text-gray-800">Performance Tier Explained</h4>
      <div className="space-y-2">
        <div>
          <p className="font-semibold text-blue-700">Low Tier:</p>
          <p className="text-gray-600">{performanceTierInfo.low.description}</p>
          <p className="text-gray-500 italic">{performanceTierInfo.low.examples}</p>
        </div>
        <div>
          <p className="font-semibold text-green-700">Mid Tier:</p>
          <p className="text-gray-600">{performanceTierInfo.mid.description}</p>
          <p className="text-gray-500 italic">{performanceTierInfo.mid.examples}</p>
        </div>
        <div>
          <p className="font-semibold text-purple-700">High Tier:</p>
          <p className="text-gray-600">{performanceTierInfo.high.description}</p>
          <p className="text-gray-500 italic">{performanceTierInfo.high.examples}</p>
        </div>
      </div>
    </div>
  );
};

const BuildForm = ({ onSubmit }) => {
    const [budget, setBudget] = useState("");
    const [performanceTier, setPerformanceTier] = useState("");
    const [showPerformanceTierTooltip, setShowPerformanceTierTooltip] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (budget && performanceTier) {
        onSubmit(Number(budget), performanceTier);
      } else {
        alert("Please fill in all fields!");
      }
    };
  
    return (
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 relative"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Build Your PC
        </h1>
        
        <p className="text-base text-gray-600 text-center mb-6 max-w-prose mx-auto leading-relaxed">
            <span className="block">
            PC Builder prioritizes the selected performance tier.
            </span>
            <span className="block">
                A build is generated from our curated parts list.
            </span>
        </p>


        <div className="mb-4">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="budget"
          >
            Budget ($)
          </label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            max="10000"
          />
        </div>
        
        <div className="mb-6 relative">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2 flex items-center" 
            htmlFor="performanceTier"
          >
            Performance Tier
            <HelpCircle 
              size={16} 
              className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700"
              onMouseEnter={() => setShowPerformanceTierTooltip(true)}
              onMouseLeave={() => setShowPerformanceTierTooltip(false)}
            />
          </label>
          <select
            id="performanceTier"
            value={performanceTier}
            onChange={(e) => setPerformanceTier(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a tier</option>
            <option value="low">Low</option>
            <option value="mid">Mid</option>
            <option value="high">High</option>
          </select>

          {showPerformanceTierTooltip && (
          <div className="absolute z-10 top-full mt-2 right-0 transform -translate-x-1/2">
            <div className="w-64 bg-white shadow-lg rounded-lg border border-gray-200 text-sm p-4">
              <h4 className="font-bold mb-2 text-gray-800">Performance Tier Explained</h4>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-blue-700">Low Tier:</p>
                  <p className="text-gray-600 text-xs">Basic tasks like web browsing, office work, media consumption, and light gaming</p>
                </div>
                <div>
                  <p className="font-semibold text-green-700">Mid Tier:</p>
                  <p className="text-gray-600 text-xs">Multi-media consumption, high-res gaming and content creation all-in-one</p>
                </div>
                <div>
                  <p className="font-semibold text-purple-700">High Tier:</p>
                  <p className="text-gray-600 text-xs">Intensive tasks like 4K gaming and professional workstations, for enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        
        <div className="flex items-center justify-center">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          >
            Generate PC Build
          </button>
        </div>
      </form>
    );
  };
  
export default BuildForm;