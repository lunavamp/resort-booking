import type { FastifyPluginAsync } from "fastify";
import type { Guest } from "../utils/parser";
import { booked } from "../store";

interface BookingPluginOptions {
  mapData:      string[][];
  bookingsData: Guest[];
}

interface BookingBody {
  roomNumber: string;
  guestName:  string;
  cabanaId:   string;
}

export const bookingRoutes: FastifyPluginAsync<BookingPluginOptions> = async (app, opts) => {
  app.post<{ Body: BookingBody }>("/", async (req, reply) => {
    const { roomNumber, guestName, cabanaId } = req.body;

    if (!roomNumber || !guestName || !cabanaId) {
      return reply.status(400).send({ error: "Missing fields" });
    }

    const validGuest = opts.bookingsData.find(
      (g) => g.room === roomNumber && g.guestName === guestName
    );

    if (!validGuest) {
      return reply.status(400).send({ error: "Invalid room number or guest name" });
    }

    if (booked.has(cabanaId)) {
      return reply.status(400).send({ error: "Already booked" });
    }

    booked.add(cabanaId);

    return reply.send({ success: true });
  });
};