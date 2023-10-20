import React, { useState } from "react";
import './App.css';
import { searchDestinations, getDestinationDetails, Destination } from "./fake-api";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinationDetails, setDestinationDetails] = useState<Destination | null>(null);
  const [error, setError] = useState<string | null>(null);

  
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!event.target.value) {
      setOptions([]);
      return;
    }

    try {
      const results = await searchDestinations(event.target.value);
      setOptions(results);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleSelection = async (destination: Destination) => {
    setSelectedDestination(destination);
    try {
      const details = await getDestinationDetails(destination.name);
      setDestinationDetails(details);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  function haversineDistance(coords1: {lat: number, lon: number}, coords2: {lat: number, lon: number}) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
    const dLon = (coords2.lon - coords1.lon) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coords1.lat * (Math.PI / 180)) * Math.cos(coords2.lat * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  const getClosestDestinations = (destination: Destination) => {
    return options
      .filter(opt => opt.id !== destination.id) // Exclude the selected country itself
      .map(opt => ({
        ...opt,
        distance: haversineDistance(
          { lat: destination.latitude, lon: destination.longitude },
          { lat: opt.latitude, lon: opt.longitude }
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5); // Take the closest 5
  };

  const handleCountryClick = async (destination: Destination) => {
    setSelectedDestination(destination);
    try {
      const details = await getDestinationDetails(destination.name);
      setDestinationDetails(details);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="App">
      <h1>Travel Destination Searcher</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search destination"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="relative mt-4">
        {options.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
            {options.map((option) => (
              <div 
                key={option.id} 
                className="cursor-pointer select-none relative px-4 py-2 hover:bg-indigo-600 hover:text-white"
                onClick={() => handleSelection(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {destinationDetails && (
        <div>
          <h2>{destinationDetails.name}</h2>
          <p>{destinationDetails.description}</p>
          <p><strong>Country:</strong> {destinationDetails.country}</p>
          <p><strong>Climate:</strong> {destinationDetails.climate}</p>
          <p><strong>Currency:</strong> {destinationDetails.currency}</p>
        </div>
              )}
      {selectedDestination && (
        <div>
          <h2>Closest Countries</h2>
          {getClosestDestinations(selectedDestination).map(country => (
            <button 
              key={country.id} 
              className="px-4 py-2 m-2 bg-indigo-600 text-white rounded"
              onClick={() => handleCountryClick(country)}
            >
              {country.name}
            </button>
          ))}
    </div>
      )}
    </div>
  );
}

export default App;
