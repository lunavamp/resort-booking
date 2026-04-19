import { describe, it, expect } from "vitest";
import { getPoolBounds } from "../utils/poolBounds";

describe("getPoolBounds", () => {
  it("finds the pool bounds", () => {
    const map = [
      [".", ".", "."],
      [".", "p", "p"],
      [".", "p", "p"],
    ];
    const bounds = getPoolBounds(map);
    expect(bounds).toEqual({ minRow: 1, maxRow: 2, minCol: 1, maxCol: 2, width: 2, height: 2 });
  });

  it("returns null if there is no pool", () => {
    const map = [[".", "W", "."]];
    expect(getPoolBounds(map)).toBeNull();
  });
});