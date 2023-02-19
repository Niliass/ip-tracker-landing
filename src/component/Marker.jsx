import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const Mark = ({ icon, position }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      position,
      13,
      {
        animate: true,
      },
      [map, position]
    );
  });
  return (
    <Marker icon={icon} position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default Mark;
