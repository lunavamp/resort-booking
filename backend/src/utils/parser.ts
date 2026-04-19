import fs from "fs";

export const loadMap = (filePath: string): string[][] => {
  const raw = fs.readFileSync(filePath, "utf-8");
  return raw
    .split("\n")
    .filter(line => line.length > 0)
    .map(row => row.split(""));
};

export interface Guest {
  room: string;
  guestName: string;
}

export const loadBookings = (filePath: string): Guest[] => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};