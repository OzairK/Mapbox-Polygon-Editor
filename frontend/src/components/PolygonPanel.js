import React from 'react';
import './PolygonPanel.css';
import { FaEdit } from 'react-icons/fa';

const PolygonPanel = ({ polygons, onEdit }) => {
  return (
    <div className="polygon-panel">
      <h1>Polygons</h1>
      {Object.keys(polygons).length === 0 ? (
        <p>No polygons available</p>
      ) : (
        Object.entries(polygons).map(([id, polygon]) => (
          <div className="polygon-card" key={id}>
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
