import React, { useState } from "react";
import './App.css';
import { searchDestinations, getDestinationDetails, Destination } from "./fake-api";

const cachedResults: Record<string, Destination[]> = {};

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinationDetails, setDestinationDetails] = useState<Destination | null>(null);
  const [error, setError] = useState<string | null>(null);
  
/**
 * Creates a debounced version of a function.
 * @param func - The function to be debounced.
 * @param wait - The number of milliseconds to wait before invoking the debounced function.
 * @returns A debounced version of the function.
 */
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  /**
   * Invokes the debounced function with the provided arguments after the specified wait time.
   * @param args - The arguments to be passed to the debounced function.
   */
  return function (this: any, ...args: any[]) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    const query = event.target.value;

    if (!query) {
      setOptions([]);
      return;
    }

    debounce(async () => {
      if (cachedResults[query]) {
        setOptions(cachedResults[query]);
        return;
      }

      try {
        const results = await searchDestinations(query);
        cachedResults[query] = results;
        setOptions(results);
        console.log("Search Results:", results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    }, 300)();
  };
  
/**
 * Handles the selection of a destination.
 * 
 * @param {Destination} destination - The selected destination.
 * @returns {Promise<void>} - A Promise that resolves when the destination details are retrieved and set.
 */
const handleSelection = async (destination: Destination): Promise<void> => {
  setSelectedDestination(destination); // Set the selected destination

  const urlParams = new URLSearchParams(window.location.search); // Get the URL search parameters
  urlParams.set("destination", destination.name); // Set the "destination" parameter to the selected destination name
  window.history.pushState({}, '', "?" + urlParams.toString()); // Update the URL with the new search parameters

  try {
    const details = await getDestinationDetails(destination.name); // Retrieve the details for the selected destination
    setDestinationDetails(details); // Set the destination details
    console.log("Destination Details:", details); // Log the destination details
  } catch (err) {
    setError(err instanceof Error ? err.message : "An unknown error occurred"); // Set the error message if an error occurred
  }
};

/**
 * Calculates the haversine distance between two sets of coordinates.
 * @param coords1 - The first set of coordinates.
 * @param coords2 - The second set of coordinates.
 * @returns The haversine distance between the two sets of coordinates.
 */
const haversineDistance = (coords1: {lat: number, lon: number}, coords2: {lat: number, lon: number}) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180); // Convert latitude difference to radians
  const dLon = (coords2.lon - coords1.lon) * (Math.PI / 180); // Convert longitude difference to radians
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(coords1.lat * (Math.PI / 180)) * Math.cos(coords2.lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); // Haversine formula
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calculate haversine distance
};

/**
 * Retrieves the closest destinations to the given destination.
 * @param destination - The destination to find closest destinations for.
 * @returns The closest destinations, sorted by distance and limited to the top 5.
 */
const getClosestDestinations = (destination: Destination) => {
  return options
    .filter(opt => opt.id !== destination.id) // Exclude the destination itself
    .map(opt => ({ ...opt, distance: haversineDistance({ lat: destination.latitude, lon: destination.longitude }, { lat: opt.latitude, lon: opt.longitude }) })) // Calculate distance for each option
    .sort((a, b) => a.distance - b.distance) // Sort options by distance
    .slice(0, 5); // Limit to top 5 closest destinations
};

  return (
    <div className="App">
    <h1>
      <a 
        href="https://www.linkedin.com/in/devandreaugustodossantos/"
        target="_blank" 
        rel="noopener noreferrer"
        title="Visit my LinkedIn profile"
      >
        Travel Destination Searcher
      </a>
    </h1>
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
              onClick={() => handleSelection(country)}
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
