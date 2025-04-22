# Schiphol assignment

## Backend

This is serving the flights.json as an api endpoint via Express.

To start server: `cd backend && npm run start`

## Frontend

The Remix frontend application fetching the flights server side and rendering.

To start client: `cd frontend && npm run start`

### Playwright e2e testing

Setup playwright first by running `npm install @playwright/test`. Run e2e tests via `npx playwright test`. For a visual representation include the `--ui` parameter.

## TODO

- Path alias (~/) is not working correctly
