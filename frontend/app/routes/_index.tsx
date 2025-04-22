import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { Header } from "~/components/layout/Header";
import { FlightSearchOverview } from "../features/flights/components/FlightSearchOverview";
import { Flight, FlightsResponse } from "../features/flights/types";

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

export default function Index() {
  const flights = useLoaderData<Flight[]>();

  return (
    <>
      <Header title="Actual flight information" text="Where are you heading?" />
      <FlightSearchOverview flights={flights} />
    </>
  );
}
