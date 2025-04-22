import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import _ from "lodash";
import { motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "~/components/layout/Container/Container";
import { Flight } from "../../types";
import { FlightCard } from "../FlightCard";

type FlightSearchOverviewProps = {
  flights: Flight[];
};

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_DELAY = 300;

// motion variants for animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const FlightSearchOverview = ({ flights }: FlightSearchOverviewProps) => {
  const finalCardRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);
  const [isSearching, setIsSearching] = useState(false);

  // scroll results into view when they are available
  useEffect(() => {
    // if (filteredFlights.length > 0 && query.length >= MIN_QUERY_LENGTH) {
    finalCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    // }
  }, [filteredFlights, query]);

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

  return (
    <Container>
      <div className="relative flex justify-center items-center w-full -mt-36">
        <div className="bg-grey-few mb-20 z-40 rounded-md shadow-md  px-6 lg:px-24 pt-12 pb-6 w-full lg:w-[600px]">
          <div className="flex flex-col gap-8 items-center justify-center relative w-full">
            <img
              src="https://cdn.schiphol.nl/web/flights/assets/flight-search-asset-CjvqQkFT.png"
              className="w-3/4 lg:w-1/2 h-auto"
              alt="Airplane"
            />
            <div className="flex relative w-full">
              <input
                type="text"
                placeholder="Destination, flight number or airline"
                value={query}
                onChange={handleSearchChange}
                className="border bg-white text-black border-gray-300 p-3 rounded-lg w-full max-w-md bg-transparent placeholder-slate-500 focus:ring-2 focus:ring-schiphol-blue focus:outline-none"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="mt-3 min-h-[20px]">
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

      {query && query.length >= MIN_QUERY_LENGTH && filteredFlights.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.25, delay: 0.2 }}
          className="text-xl text-center text-gray-400"
          data-test-id="no-flights-results"
        >
          No flights found.
        </motion.div>
      ) : query && query.length >= MIN_QUERY_LENGTH ? (
        <motion.div
          className="grid gap-6 lg:grid-cols-2 min-h-[300px]"
          variants={containerVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.25 }}
        >
          {filteredFlights.map((flight, i) => (
            <motion.div
              key={flight.flightIdentifier}
              variants={cardVariants}
              ref={i === filteredFlights.length - 1 ? finalCardRef : null}
            >
              <FlightCard flight={flight} />
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </Container>
  );
};
