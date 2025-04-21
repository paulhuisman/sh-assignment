import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT ?? '3000';

// Middleware to parse JSON
app.use(express.json());

// New endpoint to get all flights
app.get('/api/flights', (req, res) => {
  try {
    // Read the flights data from the JSON file
    const flightsData = fs.readFileSync(path.join(process.cwd(), 'data/flights.json'), 'utf8');
    const flights = JSON.parse(flightsData);

    // Send the flights data as response
    res.json(flights);
  } catch (error: unknown) {
    console.error('Got an error fetching flights data:', error);

    // Check if the error is due to file not found
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return res.status(404).json({ error: 'Flights data file not found' });
    }

    // General error handling
    res.status(500).json({ error: 'Failed to retrieve flights data' });
  }
});

app.listen(port, () => {
  console.log(`API server started on ${port}`);
});
