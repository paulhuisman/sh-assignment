import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import _ from "lodash";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import Container from "../components/layout/Container/Container";
import Header from "../components/layout/Header/Header";

interface Flight {
  flightIdentifier: string;
  flightNumber: string;
  airport: string;
  date: string;
  expectedTime: string;
  originalTime: string;
  url: string;
  score: string;
}

interface FlightsResponse {
  flights: Flight[];
  error?: string;
}

// fetch flights from the API (server side)
export async function loader() {
  const apiUrl = process.env.API_URL || "http://localhost:3001/api";

  try {
    const response = await axios.get<FlightsResponse>(`${apiUrl}/flights`);

    return response.data.flights;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw new Response(JSON.stringify({ error: "Failed to fetch flights" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// constants
const DEBOUNCE_DELAY = 300; // 300ms debounce delay
const MIN_QUERY_LENGTH = 3; // Minimum query length to trigger search
const MAX_RESULTS = 10; // Maximum number of results to display

export default function Index() {
  const flights = useLoaderData<Flight[]>();
  const [query, setQuery] = useState<string>("");
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);
  const [isSearching, setIsSearching] = useState(false);

  // Filter flights by query (debounced search) only when atleast 3 characters are entered
  const debouncedFilterFlights = useMemo(
    () =>
      _.debounce((query: string) => {
        const filtered = flights.filter((flight) => {
          return (
            flight.airport.toLowerCase().includes(query.toLowerCase()) ||
            flight.flightNumber.toLowerCase().includes(query.toLowerCase())
          );
        });
        setFilteredFlights(filtered);
        setIsSearching(false);
      }, DEBOUNCE_DELAY),
    [flights]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value;
    setQuery(queryValue);
    setIsSearching(true);

    // Only trigger search if the query has at least MIN_QUERY_LENGTH characters
    if (queryValue.length >= MIN_QUERY_LENGTH) {
      debouncedFilterFlights(queryValue);
    } else {
      setFilteredFlights([]);
      if (queryValue.length === 0) {
        setIsSearching(false);
      }
    }
  };
  console.log("isSearching.length", isSearching);
  console.log("query.length", query.length);
  return (
    <>
      <Header title="Actual flight information" text="Where are you heading?" />
      <Container>
        {/* Search input */}
        <div className=" relative flex justify-center items-center w-full -mt-36">
          <div className="bg-grey-few mb-24 z-40 rounded-md shadow-md px-24 py-12 w-full lg:w-[600px]">
            <div className="flex flex-col gap-8 items-center justify-center relative w-full">
              <img
                src="https://cdn.schiphol.nl/web/flights/assets/flight-search-asset-CjvqQkFT.png"
                className="w-1/2 h-auto"
                alt="Airplane"
              />
              <div className="flex relative w-full ">
                <input
                  type="text"
                  placeholder="Destination, flight number or airline"
                  value={query}
                  onChange={handleSearchChange}
                  className="border bg-white text-black border-gray-300 p-3 rounded-lg w-full max-w-md bg-transparent placeholder-slate-500 focus:ring-2 focus:ring-schiphol-blue focus:outline-none "
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="mt-3 min-h-[20px]">
              {/* Debounced message */}
              {isSearching && query.length < MIN_QUERY_LENGTH && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.25, delay: 0.5 }}
                  className="text-xs text-gray-500 w-full text-center"
                >
                  A minimum of {MIN_QUERY_LENGTH} characters is required to search.
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Display results */}
        {query && query.length > MIN_QUERY_LENGTH && filteredFlights.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.25, delay: 0.2 }}
            className="text-xl text-center text-gray-600"
          >
            No flights found.
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {filteredFlights.map((flight) => (
              <div key={flight.flightIdentifier} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{flight.airport}</h2>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {flight.flightNumber}
                  </span>
                </div>
                <div>
                  <p className="text-sm">{flight.date}</p>
                  <p className="text-sm">Expected time: {flight.expectedTime}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
