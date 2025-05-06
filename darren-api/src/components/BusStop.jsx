import React, { useState, useEffect } from "react";
import "../index.css";

function BusStop() {
  const [stopId, setStopId] = useState("");
  const [inputStopId, setInputStopId] = useState("");
  const [stopInfo, setStopInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const atApiUrl = `https://pp-api.at.govt.nz/gtfs/v3/stops/${stopId}`;
  const apiKey = "765cb84dc9d648e3ba346acf852451fe";

  const fetchStopInfo = async () => {
    setLoading(true);
    setError(null); // Reset error state on new fetch

    try {
      const response = await fetch(atApiUrl, {
        method: "GET",
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data) {
        setStopInfo(data.data.attributes);
        console.log(data.data.attributes);
      } else {
        setError(new Error("Stop information not found."));
        setStopInfo(null);
      }
    } catch (err) {
      setError(err);
      setStopInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stopId) {
      fetchStopInfo();
    }
  }, [stopId]); // Re-run effect when stopId changes

  const handleInputChange = (event) => {
    setInputStopId(event.target.value);
  };

  const handleSearch = () => {
    setStopId(inputStopId);
    setInputStopId(""); //to clear text in input
  };

  if (loading) {
    return <p>Loading bus stop information...</p>;
  }

  if (error) {
    return <p>Error fetching bus stop info: {error.message}</p>;
  }

  return (
    <div className="bus-container">
      <h1>Auckland Transport Stop Information</h1>
      <h2>Stop: {stopInfo?.stop_name || "N/A"}</h2>
      <p>Stop Code: {stopInfo?.stop_code || "N/A"}</p>
      <p>
        Location: Lat: {stopInfo?.stop_lat || "N/A"}, Lon:{" "}
        {stopInfo?.stop_lon || "N/A"}
      </p>

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
