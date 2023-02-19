import { useState } from "react";
import Header from "./component/Header";
import Map from "./component/Map";

function App() {
  const [coords, setCoords] = useState({
    lat: 33.5731,
    lng: -7.5898,
  });

  const handleCoords = (obj) => {
    setCoords(obj);
  };
  return (
    <div className="App">
      <Header coords={handleCoords} />
      <Map coords={coords} />
    </div>
  );
}

export default App;
