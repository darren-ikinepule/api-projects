import { useState } from 'react'
import './App.css'
function App() {
  const [stopId, setStopId] = useState("");
  const [date, setDate] = useState("2025-05-07");
  const [startHour, setStartHour] = useState("11");
  const [hourRange, setHourRange] = useState("1");
  const [stopAttributes, setStopAttributes] = useState({});
  const atApiUrl = `https://pp-api.at.govt.nz/gtfs/v3/stops/${stopId}/stoptrips?filter[date]=${date}&filter[start_hour]=${startHour}&filter[hour_range]=${hourRange}`;
  const stopData = async () => {
    try {
      const response = await fetch(atApiUrl, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': import.meta.env.VITE_AT_SUBSCRIPTION_PRIMARY_KEY
        }
      });
      const stopResponse = await response.json();
      // console.log(await response.json());
      setStopAttributes(stopResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
console.log(stopAttributes);
  return (
    <div>
      <h1>Auckland Transport Stop Info</h1>
      <label style={{ marginRight: "10px" }}>
        Bus Stop Id:⠀
        <input
          type="text"
          value={stopId}
          onChange={(e) => setStopId(e.target.value)}
        />
      </label>
      <label style={{ marginRight: "10px" }}>
        Date:⠀
        <input
          type="text"
          value={date}
          placeholder="YYYY-MM-DD"
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label style={{ marginRight: "10px" }}>
        Start Hour:⠀
        <input
          type="text"
          value={startHour}
          placeholder="Enter your hour range (0-23)"
          onChange={(e) => setStartHour(e.target.value)}
        />
      </label>
      <label style={{ marginRight: "10px" }}>
        Hour Range:⠀
        <input
          type="text"
          value={hourRange}
          placeholder="Range in hours"
          onChange={(e) => setHourRange(e.target.value)}
        />
      </label>
      <button onClick={stopData}>Get Info</button>
        {stopAttributes && stopAttributes.map(bus=>
        <>
          <h3>Destination: {bus.attributes.stop_headsign}</h3>
          <p>Route: {bus.attributes.route_id}</p>
          <p>Due: {bus.attributes.arrival_time}</p>
        </>
      )}
    </div>
  );
}
export default App;















