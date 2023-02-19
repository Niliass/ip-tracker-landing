import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Mark from "./Marker";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const containerStyle = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  minHeight: "500px",
};

const icon = L.icon({
  iconSize: [32, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -41],
  iconUrl: "./icon-location.svg",
});

const Map = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={containerStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Mark icon={icon} position={position} />
    </MapContainer>
  );
};

export default Map;
