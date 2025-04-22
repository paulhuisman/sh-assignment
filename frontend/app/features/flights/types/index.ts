export interface Flight {
  flightIdentifier: string;
  flightNumber: string;
  airport: string;
  date: string;
  expectedTime: string;
  originalTime: string;
  url: string;
  score: string;
}

export interface FlightsResponse {
  flights: Flight[];
  error?: string;
}
