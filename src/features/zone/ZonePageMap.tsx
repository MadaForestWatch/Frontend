import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  LayersControl,
  ZoomControl,
  ScaleControl,
  Pane,
  useMapEvent,
} from 'react-leaflet';

// import ranomafanaGeoJSON from '@/assets/json/ranomafana1.json';
import ranomafanaGeoJSON from '@/assets/json/ranomafana2.json';

const geoJSONStyle = { fillColor: '#109310', weight: 2, fillOpacity: 0.3, color: '#034703' };

function CatchEvents() {
  const map = useMapEvent('moveend', end);

  function end() {
    console.log(map.getBounds());
  }

  return null;
}

export default function ZonePageMap() {
  const [showLabels, setShowLabels] = useState(true);

  return (
    <MapContainer
      id="my-map"
      center={[-21.220715, 47.427196]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ width: '100%', height: `calc(100vh - 64px)` }}
      zoomControl={false}
    >
      <CatchEvents />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="ESRI satellite imagery">
          <TileLayer
            attribution='Tiles © Esri - Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            zIndex={1}
            eventHandlers={{
              add: () => setShowLabels(true),
              remove: () => setShowLabels(false),
            }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            zIndex={1}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {showLabels && (
        <Pane name="labels-pane" style={{ zIndex: 300, pointerEvents: 'none' }}>
          <TileLayer
            attribution="©OpenStreetMap, ©CartoDB"
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
          />
        </Pane>
      )}
      <ZoomControl position="bottomright" />
      <ScaleControl position="bottomleft" />
      <Marker position={[-21.220715, 47.427196]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Pane name="geojson-pane" style={{ zIndex: 299 }}>
        {/* @ts-expect-error Pff */}
        <GeoJSON data={ranomafanaGeoJSON} style={geoJSONStyle} />
      </Pane>
    </MapContainer>
  );
}
