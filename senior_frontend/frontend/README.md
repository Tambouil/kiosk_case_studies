# Dashboard Frontend

This project is a dashboard application built with React and Vite.

## Prerequisites

- Node.js (version 20.0.0 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/tambouil/kiosk_case_studies.git
   ```
2. Navigate to the project directory:
   ```bash
   cd kiosk_case_studies/senoir_frontend/frontend
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root of the project by copying the `.env.example` file:
   ```bash
   cp .env.example .env
   ```

## Development

To run the application in development mode:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or another port if 5173 is already in use).

## Build

To build the application for production:

```bash
npm run build
```

The built application will be located in the `dist` directory.

## Linting

To lint the codebase:

```bash
npm run lint
```

## Testing

To run the tests:

```bash
npm run test
```

## Project Structure

```bash
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── index.css
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
```
