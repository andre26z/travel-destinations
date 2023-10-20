export interface Destination  {
    id: number;
    name: string;
    description: string;
    country: string;
    climate: string;
    currency: string;
    latitude: number;
    longitude: number;
  };
  
  const allDestinations: Destination[] = [
    {
        "id": 1,
        "name": "Paris, France",
        "description": "The City of Light, known for its iconic Eiffel Tower and world-class cuisine.",
        "country": "France",
        "climate": "Mild",
        "currency": "Euro",
        "latitude": 48.8566,
        "longitude": 2.3522
      },
      {
        "id": 2,
        "name": "Rome, Italy",
        "description": "The Eternal City, home to ancient ruins like the Colosseum and Roman Forum.",
        "country": "Italy",
        "climate": "Mediterranean",
        "currency": "Euro",
        "latitude": 41.9028,
        "longitude": 12.4964
      },
      {
        "id": 3,
        "name": "Barcelona, Spain",
        "description": "A vibrant city famous for its unique architecture, including the Sagrada Familia.",
        "country": "Spain",
        "climate": "Mediterranean",
        "currency": "Euro",
        "latitude": 41.3851,
        "longitude": 2.1734
      },
      {
        "id": 4,
        "name": "Amsterdam, Netherlands",
        "description": "Known for its picturesque canals, historic houses, and vibrant art scene.",
        "country": "Netherlands",
        "climate": "Maritime",
        "currency": "Euro",
        "latitude": 52.3702,
        "longitude": 4.8952
      },
      {
        "id": 5,
        "name": "Prague, Czech Republic",
        "description": "The City of a Hundred Spires, famous for its medieval Old Town and Prague Castle.",
        "country": "Czech Republic",
        "climate": "Temperate",
        "currency": "Czech Crown",
        "latitude": 50.0755,
        "longitude": 14.4378
      },
      {
        "id": 6,
        "name": "Athens, Greece",
        "description": "The birthplace of democracy, with ancient landmarks like the Acropolis and Parthenon.",
        "country": "Greece",
        "climate": "Mediterranean",
        "currency": "Euro",
        "latitude": 37.9838,
        "longitude": 23.7275
      },
      {
        "id": 7,
        "name": "Budapest, Hungary",
        "description": "A city of thermal baths, stunning architecture, and the Danube River.",
        "country": "Hungary",
        "climate": "Continental",
        "currency": "Hungarian Forint",
        "latitude": 47.4979,
        "longitude": 19.0402
      },
      {
        "id": 8,
        "name": "Dubrovnik, Croatia",
        "description": "A coastal gem known for its well-preserved medieval walls and stunning Adriatic Sea views.",
        "country": "Croatia",
        "climate": "Mediterranean",
        "currency": "Croatian Kuna",
        "latitude": 42.6507,
        "longitude": 18.0944
      },
      {
        "id": 9,
        "name": "Vienna, Austria",
        "description": "A city of imperial palaces, classical music, and rich cultural heritage.",
        "country": "Austria",
        "climate": "Continental",
        "currency": "Euro",
        "latitude": 48.2082,
        "longitude": 16.3738
      },
      {
        "id": 10,
        "name": "Edinburgh, Scotland",
        "description": "The capital of Scotland, known for its historic and cultural attractions.",
        "country": "United Kingdom",
        "climate": "Maritime",
        "currency": "Pound Sterling",
        "latitude": 55.9533,
        "longitude": 3.1883
      },
      {
        "id": 11,
        "name": "Berlin, Germany",
        "description": "A vibrant city with a rich history, known for its art, music, and nightlife.",
        "country": "Germany",
        "climate": "Temperate",
        "currency": "Euro",
        "latitude": 52.52,
        "longitude": 13.405
      },
      {
        "id": 12,
        "name": "Lisbon, Portugal",
        "description": "A coastal city known for its stunning views, historic neighborhoods, and seafood.",
        "country": "Portugal",
        "climate": "Mediterranean",
        "currency": "Euro",
        "latitude": 38.7223,
        "longitude": 9.1393
      },
      {
        "id": 13,
        "name": "Stockholm, Sweden",
        "description": "A city spread across 14 islands, known for its modern design and historic sites.",
        "country": "Sweden",
        "climate": "Maritime",
        "currency": "Swedish Krona",
        "latitude": 59.3293,
        "longitude": 18.0686
      },
      {
        "id": 14,
        "name": "Krakow, Poland",
        "description": "A historic city with a well-preserved medieval core and vibrant cultural scene.",
        "country": "Poland",
        "climate": "Temperate",
        "currency": "Polish Złoty",
        "latitude": 50.0647,
        "longitude": 19.945
      },
      {
        "id": 15,
        "name": "Reykjavik, Iceland",
        "description": "The capital of Iceland, known for its geothermal pools, glaciers, and volcanoes.",
        "country": "Iceland",
        "climate": "Maritime",
        "currency": "Icelandic Króna",
        "latitude": 64.1466,
        "longitude": -21.9426
      },
      {
        "id": 16,
        "name": "Florence, Italy",
        "description": "A city famous for its Renaissance art, architecture, and historic landmarks.",
        "country": "Italy",
        "climate": "Mediterranean",
        "currency": "Euro",
        "latitude": 43.7696,
        "longitude": 11.2558
      },
      {
        "id": 17,
        "name": "Dublin, Ireland",
        "description": "The capital of Ireland, known for its rich literary and cultural heritage.",
        "country": "Ireland",
        "climate": "Maritime",
        "currency": "Euro",
        "latitude": 53.3498,
        "longitude": -6.2603
      },
      {
        "id": 18,
        "name": "Oslo, Norway",
        "description": "The capital of Norway, known for its scenic fjords, museums, and vibrant culture.",
        "country": "Norway",
        "climate": "Maritime",
        "currency": "Norwegian Krone",
        "latitude": 59.9139,
        "longitude": 10.7522
      },
      {
        "id": 19,
        "name": "Helsinki, Finland",
        "description": "The capital of Finland, known for its design, architecture, and lakeside charm.",
        "country": "Finland",
        "climate": "Temperate",
        "currency": "Euro",
        "latitude": 60.1699,
        "longitude": 24.9384
      },
      {
        "id": 20,
        "name": "Madrid, Spain",
        "description": "The capital of Spain, known for its art, culture, and vibrant nightlife.",
        "country": "Spain",
        "climate": "Mediterranean",
        "currency": "Euro",
        "latitude": 40.4168,
        "longitude": -3.7038
      }
  ];
  
  export async function searchDestinations(query: string): Promise<Destination[]> {
    console.log(`Searching for: ${query}`);
    if (query.toLowerCase() === "fail") throw new Error("Backend Error");
    return allDestinations.filter(dest => dest.name.toLowerCase().includes(query.toLowerCase()));
}

export async function getDestinationDetails(name: string): Promise<Destination> {
    console.log(`Fetching details for: ${name}`);
    const dest = allDestinations.find(dest => dest.name.toLowerCase() === name.toLowerCase());
    if (!dest) throw new Error("Destination not found");
    return dest;
}

  