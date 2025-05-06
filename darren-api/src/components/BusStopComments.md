import React, { useState, useEffect } from "react";
import "../index.css"; // Imports the CSS styles for this component

// Defines the BusStop functional component
function BusStop() {
  // State variable to store the currently searched stop ID
  const [stopId, setStopId] = useState("");
  // State variable to store the value entered in the input field
  const [inputStopId, setInputStopId] = useState("");
  // State variable to store the fetched bus stop information
  const [stopInfo, setStopInfo] = useState(null);
  // State variable to indicate if the data is currently being fetched
  const [loading, setLoading] = useState(false);
  // State variable to store any error that occurs during the API call
  const [error, setError] = useState(null);

  // API endpoint for fetching stop information by ID
  const atApiUrl = `https://pp-api.at.govt.nz/gtfs/v3/stops/${stopId}`;
  // API key for authenticating with the Auckland Transport API
  const apiKey = "765cb84dc9d648e3ba346acf852451fe";

  // Asynchronous function to fetch bus stop information from the API
  const fetchStopInfo = async () => {
    setLoading(true); // Set loading state to true when the fetch starts
    setError(null); // Reset error state on new fetch

    try {
      // Make the API call using the fetch API
      const response = await fetch(atApiUrl, {
        method: "GET", // HTTP GET request to retrieve data
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey, // Include the API key in the header for authentication
        },
      });

      // Check if the API response was successful (status code in the range 200-299)
      if (!response.ok) {
        // If not successful, throw an error with the status code
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response from the API
      const data = await response.json();

      // Check if the 'data' property exists in the API response
      if (data.data) {
        // If 'data' exists, assume the relevant stop attributes are nested within 'data.attributes'
        setStopInfo(data.data.attributes);
        // Log the fetched attributes to the console for debugging
        console.log(data.data.attributes);
      } else {
        // If 'data' is missing, set an error message and clear the stop info
        setError(new Error("Stop information not found."));
        setStopInfo(null);
      }
    } catch (err) {
      // Catch any errors that occurred during the fetch or processing
      setError(err);
      setStopInfo(null);
    } finally {
      // This block always runs, regardless of success or failure
      setLoading(false); // Set loading state to false when the fetch is complete
    }
  };

  // useEffect hook to handle side effects, in this case, fetching data
  useEffect(() => {
    // Only call fetchStopInfo if there is a valid stopId
    if (stopId) {
      fetchStopInfo();
    }
    // The empty dependency array [] would cause this effect to run only once after the initial render.
    // However, we want to fetch data when stopId changes, so we include stopId in the dependency array.
  }, [stopId]); // Re-run this effect whenever the 'stopId' state changes

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setInputStopId(event.target.value); // Update the inputStopId state with the current value of the input field
  };

  // Function to handle the search button click
  const handleSearch = () => {
    setStopId(inputStopId); // Update the stopId state with the value from the input field, triggering the useEffect
    setInputStopId(""); // Clear the text in the input field after the search
  };

  // Conditional rendering based on the loading and error states
  if (loading) {
    return <p className="loading">Loading bus stop information...</p>;
  }

  if (error) {
    return <p className="error">Error fetching bus stop info: {error.message}</p>;
  }

  // Render the bus stop information when the data has been successfully fetched
  return (
    <div className="bus-container">
      <h1>Auckland Transport Stop Information</h1>
      {/* Display the stop name if available, otherwise show 'N/A' */}
      <h2>Stop: {stopInfo?.stop_name || "N/A"}</h2>
      {/* Display the stop code if available, otherwise show 'N/A' */}
      <p>Stop Code: {stopInfo?.stop_code || "N/A"}</p>
      {/* Display the latitude and longitude if available, otherwise show 'N/A' */}
      <p>
        Location: Lat: {stopInfo?.stop_lat || "N/A"}, Lon:{" "}
        {stopInfo?.stop_lon || "N/A"}
      </p>

      {/* Input field for entering the stop ID and the search button */}
      <div>
        <input
          type="text"
          value={inputStopId}
          onChange={handleInputChange}
          placeholder="Enter Stop ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default BusStop;