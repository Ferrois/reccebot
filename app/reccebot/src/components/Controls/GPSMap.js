import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup, MapContainer } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function GPSMap() {
  return (
    <div className="w-full">
      <MapContainer
        center={[1.3521, 103.9198]}
        zoom={15}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer
        //   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className="w-full flex flex-row">

      </div>
    </div>
  );
}
