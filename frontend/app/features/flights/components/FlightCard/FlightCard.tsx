import { format } from "date-fns";
import { Flight } from "../../types";

type FlightCardProps = {
  flight: Flight;
};

export const FlightCard = ({ flight }: FlightCardProps) => {
  return (
    <div
      className="border rounded-lg shadow-sm bg-white group transition-all duration-300 ease-in-out hover:bg-afternoon-blue"
      data-test-id={`flight-card-${flight.flightIdentifier}`}
    >
      <a
        href={`https://www.schiphol.nl/${flight.url}`}
        target="_blank"
        rel="noopener noreferrer"
        title="View flight details"
      >
        <div className="flex p-4 justify-between items-center">
          <h2
            className="text-xl font-semibold text-schiphol-blue group-hover:text-white"
            data-test-id="flight-airport"
          >
            {flight.airport}
          </h2>
          <span
            className="bg-afternoon-blue/20 text-schiphol-blue px-2 py-1 rounded text-sm group-hover:text-white group-hover:bg-schiphol-blue transition-all  duration-300 ease-in-out"
            data-test-id="flight-number"
          >
            {flight.flightNumber}
          </span>
        </div>
        <div className="px-4 py-3 bg-grey-scattered text-black rounded-br-lg rounded-bl-lg group-hover:bg-grey-scattered/80 transition-all  duration-300 ease-in-out">
          <p className="text-base font-bold mb-2">{format(flight.date, "d MMMM yyyy")}</p>
          <p className="text-sm">Expected time: {flight.expectedTime}</p>
          <p className="text-sm">Original time: {flight.originalTime}</p>
        </div>
      </a>
    </div>
  );
};
