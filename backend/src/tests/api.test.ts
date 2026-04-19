import { describe, it, expect, beforeEach } from "vitest";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { mapRoutes } from "../routes/map";
import { bookingRoutes } from "../routes/booking";
import { booked } from "../store";
import type { Guest } from "../utils/parser";

const MAP: string[][] = [
  [".", ".", "."],
  [".", "W", "."],
  [".", ".", "."],
];

const BOOKINGS: Guest[] = [
  { room: "101", guestName: "Alice Smith" },
];

const buildApp = async () => {
  const app = Fastify();
  await app.register(cors, { origin: "*" });
  await app.register(mapRoutes,     { prefix: "/api/map",  mapData: MAP, bookingsData: BOOKINGS });
  await app.register(bookingRoutes, { prefix: "/api/book", mapData: MAP, bookingsData: BOOKINGS });
  return app;
};

describe("GET /api/map", () => {
  it("returns map and list of cabanas", async () => {
    const app = await buildApp();
    const res = await app.inject({ method: "GET", url: "/api/map" });

    expect(res.statusCode).toBe(200);

    const body = res.json();
    expect(body.map).toEqual(MAP);
    expect(body.cabanas).toContain("1-1");
    expect(body.booked).toEqual([]);
  });
});

describe("POST /api/book", () => {
  beforeEach(() => booked.clear());

  it("books a cabana with valid data", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/book",
      payload: { roomNumber: "101", guestName: "Alice Smith", cabanaId: "1-1" },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ success: true });
    expect(booked.has("1-1")).toBe(true);
  });

  it("rejects invalid guest data", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/book",
      payload: { roomNumber: "999", guestName: "Hacker", cabanaId: "1-1" },
    });

    expect(res.statusCode).toBe(400);
    expect(res.json().error).toBeDefined();
  });

  it("rejects double booking", async () => {
    const app = await buildApp();
    booked.add("1-1");

    const res = await app.inject({
      method: "POST",
      url: "/api/book",
      payload: { roomNumber: "101", guestName: "Alice Smith", cabanaId: "1-1" },
    });

    expect(res.statusCode).toBe(400);
    expect(res.json().error).toBe("Already booked");
  });

  it("rejects request with empty fields", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/book",
      payload: { roomNumber: "", guestName: "", cabanaId: "" },
    });

    expect(res.statusCode).toBe(400);
  });
});