import { useState, useRef, useEffect } from "react";
import { getPathTile } from "../../utils/pathTile";
import { getPoolBounds } from "../../utils/poolBounds";
import { TILE_MAP } from "../../constants/map";
import CabanaModal from "../CabanaModal/CabanaModal";
import MapCell from "./MapCell";
import PoolImage from "./PoolImage";

interface Props {
  map:    string[][];
  booked: string[];
  reload: () => void;
}

const getTile = (map: string[][], cell: string, r: number, c: number) =>
  cell === "#" ? getPathTile(map, r, c) : (TILE_MAP[cell] ?? null);

const MapGrid = ({ map, booked, reload }: Props) => {
  const [selected,  setSelected]  = useState<string | null>(null);
  const [cellSize,  setCellSize]  = useState(48);
  const gridRef    = useRef<HTMLDivElement>(null);
  const poolBounds = getPoolBounds(map);

  useEffect(() => {
    const measure = () => {
      const firstCell = gridRef.current?.querySelector(".map-cell");
      if (firstCell) {
        setCellSize(firstCell.getBoundingClientRect().width);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, [map]);

  return (
    <div className="map-grid" ref={gridRef}>
      {map.map((row, r) => (
        <div key={r} className="map-row">
          {row.map((cell, c) => {
            const id       = `${r}-${c}`;
            const isCabana = cell === "W";
            const isBooked = booked.includes(id);
            const isPool   = cell === "p";
            const tile     = getTile(map, cell, r, c);

            return (
              <MapCell
                key={id}
                cell={cell}
                id={id}
                tile={tile}
                isPool={isPool}
                isCabana={isCabana}
                isBooked={isBooked}
                onClick={() => isCabana && setSelected(id)}
              />
            );
          })}
        </div>
      ))}

      {poolBounds && <PoolImage bounds={poolBounds} cellSize={cellSize} />}

      {selected && (
        <CabanaModal
          id={selected}
          isBooked={booked.includes(selected)}
          onClose={() => setSelected(null)}
          onSuccess={() => { setSelected(null); reload(); }}
        />
      )}
    </div>
  );
};

export default MapGrid;