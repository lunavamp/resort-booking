import type { PoolBounds } from "../../utils/poolBounds";

interface Props {
  bounds:   PoolBounds;
  cellSize: number;
}

const PoolImage = ({ bounds, cellSize }: Props) => (
  <img
    src="/assets/pool.png"
    alt="pool"
    className="map-pool"
    draggable={false}
    style={{
      top:    bounds.minRow * cellSize,
      left:   bounds.minCol * cellSize,
      width:  bounds.width  * cellSize,
      height: bounds.height * cellSize,
    }}
  />
);

export default PoolImage;