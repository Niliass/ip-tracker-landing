import { useState } from "react";
import Header from "./component/Header";
import Map from "./component/Map";

function App() {
  const [coords, setCoords] = useState({
    lat: 33.5731,
    lng: -7.5898,
  });

  return (
    <div className="App">
      <Header coords={(obj) => setCoords(obj)} />
      <Map position={coords} />
    </div>
  );
}

export default App;
