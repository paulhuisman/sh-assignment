import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Container from "~/components/layout/Container/Container";
import { useFlightSearch } from "../../hooks/useFlightSearch";
import { Flight } from "../../types";
import { FlightCard } from "../FlightCard";

type FlightSearchOverviewProps = {
  flights: Flight[];
};

const MIN_QUERY_LENGTH = 3;

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
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date");

  // Search (and sort) flights hook
  const { filteredFlights, isSearching, searchFlights } = useFlightSearch(flights);

  // Scroll results into view when they are available
  useEffect(() => {
    if (filteredFlights.length > 0 && query.length >= MIN_QUERY_LENGTH) {
      // Scroll to the first card on mobile, last card on anything bigger
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [filteredFlights, query]);

  useEffect(() => {
    searchFlights(query, sortBy);
  }, [query, sortBy, searchFlights]);

  // Handle sorting change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value;
    setQuery(queryValue);
  };

  const hasValidQuery = query.length >= MIN_QUERY_LENGTH;

  return (
    <Container>
      <div className="relative flex justify-center items-center w-full -mt-36">
        <div className="bg-grey-few mb-20 z-40 rounded-md shadow-md  px-4 lg:px-24 pt-12 pb-0 lg:pb-6 w-full lg:w-[600px]">
          <div className="flex flex-col gap-8 items-center justify-center relative w-full">
            <img
              src="https://cdn.schiphol.nl/web/flights/assets/flight-search-asset-CjvqQkFT.png"
              className="w-3/4 lg:w-1/2 h-auto"
              alt="Airplane"
            />
            <div className="flex relative w-full">
              <input
                type="text"
                placeholder="Search for destination or flight number"
                value={query}
                onChange={handleSearchChange}
                className="border bg-white text-black border-gray-300 p-3 rounded-lg w-full max-w-md bg-transparent placeholder-slate-500 focus:ring-2 focus:ring-schiphol-blue focus:outline-none"
              />
              <AnimatePresence>
                {query.length > 0 ? (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeIn", duration: 0.25, delay: 0.1 }}
                    onClick={() => {
                      setQuery("");
                    }}
                    className="absolute right-3  top-1/2 transform -translate-y-1/2 text-schiphol-blue hover:text-gray-800 transition"
                  >
                    <XMarkIcon className="size-5" />
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 1, x: -10 }}
                    transition={{ ease: "easeIn", duration: 0.2 }}
                  >
                    <MagnifyingGlassIcon className="size-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-3 min-h-[20px]">
            {isSearching && query.length < MIN_QUERY_LENGTH && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.25, delay: 0.6 }}
                className="text-xs text-gray-500 w-full text-center"
              >
                A minimum of {MIN_QUERY_LENGTH} characters is required to search
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hasValidQuery && filteredFlights.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.25, delay: 0.2 }}
            className="text-xl text-center text-gray-300 font-neue-frutiger"
            data-test-id="no-flights-results"
          >
            No flights found.
          </motion.div>
        ) : hasValidQuery ? (
          <>
            <div className="flex justify-end mb-4 items-center gap-2 text-sm">
              Sort by
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border rounded-md bg-grey-few text-black"
              >
                <option value="date">Date</option>
                <option value="expectedTime">Expected time</option>
              </select>
            </div>
            <motion.div
              className="grid gap-6 lg:grid-cols-2 min-h-[300px]"
              variants={containerVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeIn", duration: 0.25 }}
              ref={resultsRef}
            >
              {filteredFlights.map((flight, i) => (
                <motion.div key={flight.flightIdentifier} variants={cardVariants}>
                  <FlightCard flight={flight} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </Container>
  );
};
