import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  minHeight: "500px",
};

function MyComponent({ coords }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAsIpWT92jLItlNnXjbjsM7NpG-Kzd3Y6k",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coords);
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
      icon: "./icon-location.svg",
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const handleChange = useCallback(() => {
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
      icon: "./icon-location.svg",
    });
  }, [coords]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coords}
      zoom={13}
      onCenterChanged={handleChange}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
