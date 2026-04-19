export interface PoolBounds {
  minRow: number;
  maxRow: number;
  minCol: number;
  maxCol: number;
  width: number;  
  height: number; 
}

export const getPoolBounds = (map: string[][]): PoolBounds | null => {
  let minRow = Infinity, maxRow = -Infinity;
  let minCol = Infinity, maxCol = -Infinity;

  map.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === "p") {
        minRow = Math.min(minRow, r);
        maxRow = Math.max(maxRow, r);
        minCol = Math.min(minCol, c);
        maxCol = Math.max(maxCol, c);
      }
    });
  });

  if (minRow === Infinity) return null;

  return {
    minRow, maxRow, minCol, maxCol,
    width:  maxCol - minCol + 1,
    height: maxRow - minRow + 1,
  };
};