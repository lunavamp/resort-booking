import { describe, it, expect } from "vitest";
import { getPathTile } from "../utils/pathTile";

const M = (rows: string[]): string[][] => rows.map((r) => r.split(""));

describe("getPathTile", () => {
  it("returns crossing for 4 neighbors", () => {
    const map = M(["###", "###", "###"]);
    const { image } = getPathTile(map, 1, 1);
    expect(image).toContain("arrowCrossing");
  });

  it("returns straight for horizontal", () => {
    const map = M(["...", "###", "..."]);
    const { image, rotate } = getPathTile(map, 1, 1);
    expect(image).toContain("arrowStraight");
    expect(rotate).toBe(90);
  });

  it("returns straight for vertical", () => {
    const map = M(["#..", "#..", "#.."]);
    const { image, rotate } = getPathTile(map, 1, 0);
    expect(image).toContain("arrowStraight");
    expect(rotate).toBe(0);
  });

  it("returns end for dead end (only down neighbor)", () => {
    const map = M(["#..", "#..", "..."]);
    const { image } = getPathTile(map, 0, 0);
    expect(image).toContain("arrowEnd");
  });

  it("returns corner for right+down neighbors", () => {
    const map = M(["...", ".##", ".#."]);
    const { image } = getPathTile(map, 1, 1);
    expect(image).toContain("arrowCornerSquare");
  });

  it("returns split for T-junction", () => {
    const map = M(["...", "###", ".#."]);
    const { image } = getPathTile(map, 1, 1);
    expect(image).toContain("arrowSplit");
  });
});
