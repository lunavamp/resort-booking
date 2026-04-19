import type { TileData } from "../types";

export const CELL_SIZE = 48;

export const TILE_MAP: Partial<Record<string, TileData>> = {
  c: { image: "/assets/houseChimney.png", rotate: 0 },
  W: { image: "/assets/cabana.png",       rotate: 0 },
};