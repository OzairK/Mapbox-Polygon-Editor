// src/PolygonPanel.js
import React from 'react';
import './PolygonPanel.css';
import { FaEdit } from 'react-icons/fa';

const PolygonPanel = ({ polygons, onEdit }) => {
  return (
    <div className="polygon-panel">
      <h1>Polygons</h1>
      {polygons.length === 0 ? (
        <p>No polygons available</p>
      ) : (
        polygons.map(polygon => (
          <div className="polygon-card" key={polygon.id}>
            <div className="polygon-card-header">
              <h3>{polygon.name}</h3>
              <FaEdit onClick={() => onEdit(polygon)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PolygonPanel;
