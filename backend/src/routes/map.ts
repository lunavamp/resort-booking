import type { FastifyPluginAsync } from "fastify";
import { booked } from "../store";

interface MapPluginOptions {
  mapData: string[][];
  bookingsData: unknown;
}

export const mapRoutes: FastifyPluginAsync<MapPluginOptions> = async (app, opts) => {
  app.get("/", async (_req, reply) => {
    const cabanas: string[] = [];

    opts.mapData.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === "W") cabanas.push(`${y}-${x}`);
      });
    });

    return reply.send({
      map:    opts.mapData,
      cabanas,
      booked: Array.from(booked),
    });
  });
};