import { format } from "date-fns";
import { Flight } from "../../types";

type FlightCardProps = {
  flight: Flight;
};

export const FlightCard = ({ flight }: FlightCardProps) => {
  return (
    <div
      className="border rounded-lg shadow-sm bg-white"
      data-test-id={`flight-card-${flight.flightIdentifier}`}
    >
      <div className="flex p-4 justify-between items-center ">
        <h2 className="text-xl font-semibold text-schiphol-blue" data-test-id="flight-airport">
          {flight.airport}
        </h2>
        <span
          className="bg-afternoon-blue/20 text-schiphol-blue px-2 py-1 rounded text-sm"
          data-test-id="flight-number"
        >
          {flight.flightNumber}
        </span>
      </div>
      <div className="px-4 py-3 bg-grey-scattered text-black rounded-br-lg rounded-bl-lg">
        <p className="text-sm">{format(flight.date, "d MMM yyyy")}</p>
        <p className="text-sm">Expected time: {flight.expectedTime}</p>
      </div>
    </div>
  );
};
