"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markerPosition: [number, number];
  popupContent: {
    title: string;
    address: string;
  };
  className?: string;
}

const LeafletMap = ({
  center,
  zoom = 15,
  markerPosition,
  popupContent,
  className = "",
}: LeafletMapProps) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", minHeight: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition}>
          <Popup>
            <div className="text-center font-sans min-w-[200px] p-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                {popupContent.title}
              </h3>
              <p className="text-xs text-gray-600 leading-tight">
                {popupContent.address}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
