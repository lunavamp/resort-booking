import Fastify from "fastify";
import cors from "@fastify/cors";
import { mapRoutes } from "./routes/map";
import { bookingRoutes } from "./routes/booking";
import { loadMap, loadBookings } from "./utils/parser";
import path from "path";

// ─── CLI arguments ────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag: string, fallback: string) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const mapPath      = getArg("--map",      path.resolve("data/map.ascii"));
const bookingsPath = getArg("--bookings", path.resolve("data/bookings.json"));

// ─── load data just once at startup ─────────────
const mapData      = loadMap(mapPath);
const bookingsData = loadBookings(bookingsPath);

// ─── Fastify ──────────────────────────────────────────
const app = Fastify({ logger: true });

await app.register(cors, { origin: "*" });

await app.register(mapRoutes,     { prefix: "/api/map",  mapData, bookingsData });
await app.register(bookingRoutes, { prefix: "/api/book", mapData, bookingsData });

const PORT = 3001;

try {
  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`Backend running on http://localhost:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}