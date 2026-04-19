import { useEffect, useState } from "react";
import { getMap } from "./api";
import MapGrid from "./components/MapGrid/MapGrid";
import type { MapData } from "./types";
import "./assets/styles/main.scss";

function App() {
  const [data, setData] = useState<MapData>({ map: [], booked: [] });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const result = await getMap();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="app">
      <header className="app-header container">
        <div className="app-header__brand">
          <span className="app-header__eyebrow">Poolside Experience</span>
          <h1 className="app-header__title">Resort Map</h1>
        </div>

        <nav className="app-header__legend" aria-label="Map legend">
          <div className="app-header__legend-item">
            <span className="app-header__legend-dot app-header__legend-dot--available" />
            Available
          </div>
          <div className="app-header__legend-item">
            <span className="app-header__legend-dot app-header__legend-dot--booked" />
            Booked
          </div>
        </nav>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="app-loading">
            <div className="app-loading__spinner" />
            <span className="app-loading__text">Loading resort map…</span>
          </div>
        ) : (
          <div className="map-wrapper">
            <p className="map-wrapper__label container">
              Tap a cabana to reserve
            </p>
            <MapGrid map={data.map} booked={data.booked} reload={load} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
