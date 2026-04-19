import type { TileData } from "../../types";

interface Props {
  cell:     string;
  id:       string;
  tile:     TileData | null;
  isPool:   boolean;
  isCabana: boolean;
  isBooked: boolean;
  onClick:  () => void;
}

const getCellClass = (isCabana: boolean, isBooked: boolean): string =>
  [
    "map-cell",
    isCabana              && "map-cell--cabana",
    isCabana && isBooked  && "map-cell--booked",
    isCabana && !isBooked && "map-cell--available",
  ]
    .filter(Boolean)
    .join(" ");

const getCellTitle = (isCabana: boolean, isBooked: boolean): string | undefined =>
  isCabana ? (isBooked ? "Booked" : "Available — click to book") : undefined;

const MapCell = ({ cell, id, tile, isPool, isCabana, isBooked, onClick }: Props) => (
  <div
    key={id}
    className={getCellClass(isCabana, isBooked)}
    onClick={onClick}
    title={getCellTitle(isCabana, isBooked)}
  >
    {!isPool && tile && (
      <img
        src={tile.image}
        alt={cell}
        className="map-cell__img"
        style={tile.rotate ? { transform: `rotate(${tile.rotate}deg)` } : undefined}
        draggable={false}
      />
    )}
  </div>
);

export default MapCell;