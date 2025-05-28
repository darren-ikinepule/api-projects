
import React, { useState, useEffect } from "react";
const url = "https://pp-api.at.govt.nz/realtime/legacy/ferrypositions";
const ferryKey = import.meta.env.VITE_FERRY_API_KEY;



function App() {
  const [ferryData, setFerryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const[ferry,setFerry] = useState({});
  const[vesselName,setVesselName] = useState("");
  const[callSign,setCallSign] = useState("");
  const[operator,setOperator] = useState("");
  const[lng,setLng] = useState("");
  const[lat,setLat] = useState("");

  useEffect(() => {
  const fetchFerryData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          "x-api-key": ferryKey,
        },
      });

      // Assuming you want to parse the response
      const data = await response.json();
      // Do something with the data
      // e.g., setFerryData(data);

    } catch (error) {
      console.error("Error fetching ferry data:", error);
      setError(error);
    }
  };

  fetchFerryData();
}, [url, ferryKey]); // Add dependencies as needed
  useEffect(() => {
    if (ferryData.length > 0) {
      setFerry(ferryData[0]);
      setVesselName(ferryData[0].VesselName);
      setCallSign(ferryData[0].CallSign);
      setOperator(ferryData[0].Operator);
      setLng(ferryData[0].Longitude);
      setLat(ferryData[0].Latitude);
    }
  }, [ferryData]);


  return (
    <div>
      <h3>{ferry.VesselName}</h3>
      <p>Vessel Name: {ferry.repsonse.vesselName}</p>
      <p>Call Sign: {ferry.response.callsign}</p>
      <p>Operator: {ferry.response.operator}</p>
      <p>Longitude: {ferry.response.lng}</p>
      <p>Latitude: {ferry.response.lat}</p>
      <hr />
    </div>
  );
}

export default App;
