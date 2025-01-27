import React, { useState } from "react";
import BuildForm from "./components/BuildForm";
import BuildResult from "./components/BuildResult";
import axios from "axios";

const App = () => {
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false); // Loading screen state
    const [build, setBuild] = useState(null); // Stores the build details
    const [currentScreen, setCurrentScreen] = useState("form"); // Tracks which screen to display
  
    // Function to handle form submission
    const handleSuggestBuild = async (budget, tier) => {
      setLoading(true);
      setCurrentScreen("loading"); // Show the loading screen
      try {
        // Get buildId from suggestBuild POST
        const postResponse = await axios.post("http://localhost:5000/api/builds/suggest", { budget, tier });
        const buildId = postResponse.data.savedBuildId;
        console.log("BuildId Response: ", buildId);
        // Use buildId to fetch build details
        const getResponse = await axios.get(`http://localhost:5000/api/builds/${buildId}`);
        console.log("Build Details:", getResponse.data);

        // Display build data
        setBuild(getResponse.data); // Save the returned build details
        setCurrentScreen("build"); // Switch to the results screen
      } catch (error) {
        console.error("Error suggesting build:", error);
        alert("Something went wrong. Please try again.");
        setCurrentScreen("form"); // Return to the form screen if there's an error
      } finally {
        setLoading(false); // Stop showing the loading screen
      }
    };
  
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {currentScreen === "form" && (
              <BuildForm onSubmit={handleSuggestBuild} />
            )}
            {currentScreen === "loading" && (
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Generating...</h1>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                </div>
              </div>
            )}
            {currentScreen === "build" && (
              <BuildResult build={build} onGoBack={() => setCurrentScreen("form")} />
            )}
          </div>
        </div>
      );
    };
  
export default App;