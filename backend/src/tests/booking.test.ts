import { describe, it, expect, beforeEach } from "vitest";
import { booked } from "../store";

beforeEach(() => booked.clear());

describe("booking store", () => {
  it("adds a cabana to the set", () => {
    booked.add("5-3");
    expect(booked.has("5-3")).toBe(true);
  });

  it("does not duplicate bookings", () => {
    booked.add("5-3");
    booked.add("5-3");
    expect(booked.size).toBe(1);
  });

  it("correctly removes a booking", () => {
    booked.add("5-3");
    booked.delete("5-3");
    expect(booked.has("5-3")).toBe(false);
  });
});