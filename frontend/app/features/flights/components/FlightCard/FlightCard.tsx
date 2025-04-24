import { Flight } from "../../types";

type FlightCardProps = {
  flight: Flight;
};

export const FlightCard = ({ flight }: FlightCardProps) => {
  const isDelayed = flight.expectedTime !== flight.originalTime;

  return (
    <div
      className="border rounded-lg shadow-sm bg-white group transition-all duration-300 ease-in-out hover:bg-afternoon-blue"
      data-test-id={`flight-card-${flight.flightIdentifier}`}
    >
      <a
        href={`https://www.schiphol.nl${flight.url}`}
        target="_blank"
        rel="noopener noreferrer"
        title="View flight details"
      >
        <div className="flex p-4 justify-between items-center">
          <h2
            className="text-xl flex items-center gap-2.5 font-bold font-neue-frutiger text-schiphol-blue group-hover:text-white"
            data-test-id="flight-airport"
          >
            {isDelayed ? (
              <span>
                <span className="line-through text-gray-500 mr-2">{flight.originalTime}</span>
                <span className="text-red-600">{flight.expectedTime}</span>
              </span>
            ) : (
              <span>{flight.originalTime}</span>
            )}
            <span>{flight.airport}</span>
          </h2>
          <span
            className="bg-afternoon-blue/20 text-schiphol-blue px-2 py-1 rounded text-sm group-hover:text-white group-hover:bg-schiphol-blue transition-all  duration-300 ease-in-out"
            data-test-id="flight-number"
          >
            {flight.flightNumber}
          </span>
        </div>
      </a>
    </div>
  );
};
