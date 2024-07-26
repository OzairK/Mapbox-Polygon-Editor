import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ openModal, setCurrentPolygon, handleUpdate, handleDelete, polygons }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    const Draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });
    drawRef.current = Draw;
    map.addControl(Draw, 'top-right');
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.on('draw.create', (e) => {
      const polygon = e.features[0];
      setCurrentPolygon(polygon);
      openModal(polygon);
    });

    map.on('draw.update', (e) => {
      const polygon = e.features[0];
      handleUpdate(polygon);
    });

    map.on('draw.delete', (e) => {
      const polygon = e.features[0];
      handleDelete(polygon.id);
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    mapRef.current = map;

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (drawRef.current && mapRef.current && polygons) {
      const features = Object.values(polygons).map(polygon => {
        if (polygon.geoJson && polygon.geoJson.type && polygon.geoJson.geometry) {
          return polygon.geoJson;
        } else {
          console.error('Invalid polygon data:', polygon);
          return null;
        }
      }).filter(feature => feature !== null);

      drawRef.current.set({ type: 'FeatureCollection', features });
    }
  }, [polygons]);

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
