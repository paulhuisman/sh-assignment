import { format } from "date-fns";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { Flight } from "../types";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_DELAY = 150;

type GroupedFlights = Record<string, Flight[]>;

export const useFlightSearch = (flights: Flight[]) => {
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [groupedFlights, setGroupedFlights] = useState<GroupedFlights>({});
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

      // Sort logic
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === "expectedTime") {
          // Not sure wether to include date or not for this feature
          return new Date(`${a.expectedTime}`).getTime() - new Date(`${b.expectedTime}`).getTime();
        } else {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      });

      // Group by date if sorting by date
      if (sortBy === "date") {
        const grouped = filtered.reduce<GroupedFlights>((acc, flight) => {
          const dateKey = format(new Date(flight.date), "yyyy-MM-dd");
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(flight);
          return acc;
        }, {});
        setGroupedFlights(grouped);
      } else {
        setGroupedFlights({});
      }

      setFilteredFlights(filtered);
      setIsSearching(false);
    },
    [flights]
  );

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
        setGroupedFlights({});
        if (query.length === 0) {
          setIsSearching(false);
        }
      }
    },
    [debouncedFilterFlights]
  );

  return { filteredFlights, groupedFlights, isSearching, searchFlights };
};
