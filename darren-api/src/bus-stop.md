# BusStop Component

The `BusStop` component is a React functional component that allows users to fetch and display information about a bus stop from the Auckland Transport API.

## Features

- Fetches bus stop information using the Auckland Transport API.
- Displays the stop name, stop code, and location (latitude and longitude).
- Allows users to input a stop ID to search for specific bus stop information.
- Handles loading and error states gracefully.

## Code Overview

### State Variables

- `stopId`: Stores the current stop ID for which information is being fetched.
- `inputStopId`: Stores the user input for the stop ID.
- `stopInfo`: Stores the fetched bus stop information.
- `loading`: Indicates whether the data is currently being fetched.
- `error`: Stores any error that occurs during the fetch operation.

### API Integration

- **API URL**: `https://pp-api.at.govt.nz/gtfs/v3/stops/{stopId}`
- **API Key**: `765cb84dc9d648e3ba346acf852451fe`
- The `fetchStopInfo` function performs the API call using the `fetch` method and updates the state based on the response.

### Event Handlers

- `handleInputChange`: Updates the `inputStopId` state when the user types in the input field.
- `handleSearch`: Sets the `stopId` state to the value of `inputStopId` and clears the input field.

### Effects

- A `useEffect` hook is used to fetch bus stop information whenever the `stopId` state changes.

### Conditional Rendering

- Displays a loading message when `loading` is `true`.
- Displays an error message if an error occurs during the fetch operation.
- Displays bus stop information if available.

## Component Structure

```jsx
<div className='bus-container'>
  <h1>Auckland Transport Stop Information</h1>
  <h2>Stop: {stopInfo?.stop_name || 'N/A'}</h2>
  <p>Stop Code: {stopInfo?.stop_code || 'N/A'}</p>
  <p>Location: Lat: {stopInfo?.stop_lat || 'N/A'}, Lon: {stopInfo?.stop_lon || 'N/A'}</p>

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