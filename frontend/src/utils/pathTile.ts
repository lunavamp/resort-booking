export type PathTileResult = {
  image: string;
  rotate: number;
};

const isPath = (map: string[][], row: number, col: number): boolean => {
  if (row < 0 || row >= map.length) return false;
  if (col < 0 || col >= map[row].length) return false;
  return map[row][col] === "#";
};

export const getPathTile = (map: string[][], row: number, col: number): PathTileResult => {
  
  const up    = isPath(map, row - 1, col); 
  const down  = isPath(map, row + 1, col); 
  const left  = isPath(map, row, col - 1);
  const right = isPath(map, row, col + 1);

  const count = [up, down, left, right].filter(Boolean).length;

  
  if (count === 4) {
    return { image: "/assets/arrowCrossing.png", rotate: 0 };
  }


  if (count === 3) {
    if (!down)  return { image: "/assets/arrowSplit.png", rotate: 270 }; // up+left+right
    if (!left)  return { image: "/assets/arrowSplit.png", rotate: 0   }; // up+down+right
    if (!up)    return { image: "/assets/arrowSplit.png", rotate: 90  }; // down+left+right
    if (!right) return { image: "/assets/arrowSplit.png", rotate: 270 }; // up+down+left
  }


  if (count === 2) {
    if (up && down)    return { image: "/assets/arrowStraight.png",     rotate: 0   }; 
    if (left && right) return { image: "/assets/arrowStraight.png",     rotate: 90  }; 
    if (up && right)   return { image: "/assets/arrowCornerSquare.png", rotate: 0   };
    if (up && left)    return { image: "/assets/arrowCornerSquare.png", rotate: 270 };
    if (down && left)  return { image: "/assets/arrowCornerSquare.png", rotate: 180 };
    if (down && right) return { image: "/assets/arrowCornerSquare.png", rotate: 90  };
  }


  if (count === 1) {
    if (up)    return { image: "/assets/arrowEnd.png", rotate: 0   };
    if (right) return { image: "/assets/arrowEnd.png", rotate: 270 };
    if (down)  return { image: "/assets/arrowEnd.png", rotate: 180 };
    if (left)  return { image: "/assets/arrowEnd.png", rotate: 90  };
  }


  return { image: "/assets/arrowStraight.png", rotate: 0 };
};