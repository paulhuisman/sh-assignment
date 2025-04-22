import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { Flight } from "../types";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_DELAY = 150;

export const useFlightSearch = (flights: Flight[]) => {
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const filterFlights = useCallback(
    (query: string, sortBy: string) => {
      const normalizedQuery = query.trim().replace(/\s+/g, "").toLowerCase();

      let filtered = flights.filter((flight) => {
        const normalizedFlightNumber = flight.flightNumber.replace(/\s+/g, "").toLowerCase();
        return (
          flight.airport.toLowerCase().includes(query.trim().toLowerCase()) ||
          normalizedFlightNumber.includes(normalizedQuery)
        );
      });

      // Apply sorting based on sortBy parameter
      if (sortBy) {
        filtered = [...filtered].sort((a, b) => {
          if (sortBy === "date") {
            // Sort by date
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return aDate.getTime() - bDate.getTime();
          } else if (sortBy === "expectedTime") {
            // Sort by expected time (within the same date)
            const aTime = new Date(`${a.date}T${a.expectedTime}`);
            const bTime = new Date(`${b.date}T${b.expectedTime}`);
            return aTime.getTime() - bTime.getTime();
          }
          // Return 0 if no sortBy or unrecognized sort field
          return 0;
        });
      }

      setFilteredFlights(filtered);
      setIsSearching(false);
    },
    [flights]
  );

  // Debounced version of the filtering function
  const debouncedFilterFlights = useMemo(
    () => _.debounce(filterFlights, DEBOUNCE_DELAY),
    [filterFlights]
  );

  const searchFlights = useCallback(
    (query: string, sortBy: string) => {
      setIsSearching(true);

      if (query.length >= MIN_QUERY_LENGTH) {
        debouncedFilterFlights(query, sortBy);
      } else {
        setFilteredFlights([]);
        if (query.length === 0) {
          setIsSearching(false);
        }
      }
    },
    [debouncedFilterFlights]
  );

  return { filteredFlights, isSearching, searchFlights };
};
