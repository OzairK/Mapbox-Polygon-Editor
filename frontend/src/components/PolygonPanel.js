import React, { useState } from 'react';
import './PolygonPanel.css';
import { FaEdit } from 'react-icons/fa';

const PolygonPanel = ({ polygons, onEdit, onShareLink }) => {
  const [editPolygonId, setEditPolygonId] = useState(null);
  const [editPolygonName, setEditPolygonName] = useState('');

  const handleEditClick = (polygon) => {
    setEditPolygonId(polygon.id);
    setEditPolygonName(polygon.name);
  };

  const handleNameChange = (e) => {
    setEditPolygonName(e.target.value);
  };

  const handleNameSave = (id) => {
    onEdit(id, editPolygonName);
    setEditPolygonId(null);
  };

  return (
    <div className="polygon-panel">
      <div className="polygon-panel-header">
        <h1>Polygons</h1>
        <button className="share-link-button" onClick={onShareLink}>Share Link</button>
      </div>
      {Object.keys(polygons).length === 0 ? (
        <p>No polygons available</p>
      ) : (
        Object.entries(polygons).map(([id, polygon]) => (
          <div className="polygon-card" key={id}>
            <div className="polygon-card-header">
              {editPolygonId === id ? (
                <input
                  type="text"
                  value={editPolygonName}
                  onChange={handleNameChange}
                  onBlur={() => handleNameSave(id)}
                  autoFocus
                />
              ) : (
                <>
                  <h3>{polygon.name}</h3>
                  <FaEdit onClick={() => handleEditClick(polygon)} />
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PolygonPanel;
