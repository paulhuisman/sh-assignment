// app/routes/index.tsx
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import Container from "~/components/layout/Container/Container";
import Header from "~/components/layout/Header/Header";

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

export default function Index() {
  const flights = useLoaderData<typeof loader>();

  return (
    <>
      <Header title="Actual flight information" text="Where are you heading?" />
      <Container>
        {!flights || flights.length === 0 ? (
          <p className="text-gray-600">No flights available at the moment.</p>
        ) : (
          <div className="grid gap-6">
            {flights.map((flight) => (
              <div key={flight.flightIdentifier} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{flight.airport}</h2>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {flight.flightNumber}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
