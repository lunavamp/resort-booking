# Resort Cabana Booking

Interactive resort map for poolside cabana booking.

> **Note:** Backend is hosted on Render free tier and may take
> up to 30 seconds to wake up on the first request.

## Quick Start

```bash
npm install
npm run dev
```

### Alternative Files

```bash
npm run dev -- --map ./path/to/map.ascii --bookings ./path/to/bookings.json
```

### Tests

```bash
# All tests
npm test

# Backend only
npm run test:backend

# Frontend only
npm run test:frontend
```

## Requirements

- Node.js 18+
- npm 9+

## Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, SCSS |
| **Backend** | Fastify 5, TypeScript, tsx |

