import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import PolygonPanel from './components/PolygonPanel';
import sessionNetwork from './network/sessionNetwork';
import PolygonModal from './components/PolygonModal';
import polygonNetwork from './network/polygonNetwork';

function App() {
  useEffect(() => {
    const initializeSession = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionIdFromUrl = urlParams.get('sessionId');
      
      const sessionId = sessionIdFromUrl || sessionStorage.getItem('sessionId');
      const sessionExpiresAt = sessionStorage.getItem('sessionExpiresAt');
      const isSessionValid = sessionExpiresAt && new Date(sessionExpiresAt) > new Date();

      if (sessionIdFromUrl) {
        try {
          await sessionNetwork.getSession(sessionIdFromUrl);
        } catch (error) {
          console.error('Error retrieving session from URL:', error);
          await sessionNetwork.createSession();
        }
      } else if (!sessionId || !isSessionValid) {
        await sessionNetwork.createSession();
      } else {
        await sessionNetwork.getSession(sessionId);
      }
      
      await fetchPolygons();
    };

    initializeSession();
  }, []);

  const [polygons, setPolygons] = useState({});
  const [currentPolygon, setCurrentPolygon] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPolygons = async () => {
    try {
      const polygons = await polygonNetwork.getAllPolygons();
      const polygonsMap = polygons.reduce((acc, polygon) => {
        acc[polygon.polygon_id] = {
          id: polygon.polygon_id,
          name: polygon.name,
          geoJson: {
            id: polygon.polygon_id,
            type: 'Feature',
            properties: {},
            geometry: polygon.geom
          }
        };
        return acc;
      }, {});
      setPolygons(polygonsMap);
    } catch (error) {
      console.error('Error fetching polygons:', error);
    }
  };

  const openModal = (polygon) => {
    setCurrentPolygon(polygon);
    setIsModalOpen(true);
  };

  const handleSave = async (name) => {
    try {
      const newPolygon = await polygonNetwork.createPolygon(currentPolygon.id, name, currentPolygon);
      setPolygons(prevPolygons => ({
        ...prevPolygons,
        [newPolygon.polygon_id]: {
          id: newPolygon.polygon_id,
          name: newPolygon.name,
          geoJson: {
            id: newPolygon.polygon_id,
            type: 'Feature',
            properties: {},
            geometry: newPolygon.geom
          }
        }
      }));
    } catch (error) {
      console.error('Error creating polygon:', error);
    } finally {
      closeModal();
    }
  };

  const handleUpdate = async (polygon) => {
    try {
      const updatedPolygon = await polygonNetwork.updatePolygon(polygon.id, polygon.name, polygon);
      setPolygons(prevPolygons => ({
        ...prevPolygons,
        [updatedPolygon.polygon_id]: {
          id: updatedPolygon.polygon_id,
          name: updatedPolygon.name,
          geoJson: {
            id: updatedPolygon.polygon_id,
            type: 'Feature',
            properties: {},
            geometry: updatedPolygon.geom
          }
        }
      }));
    } catch (error) {
      console.error('Error updating polygon:', error);
    }
  };

  const handleDelete = async (polygonId) => {
    try {
      const formattedPolygonId = polygonId.replace(/-/g, '');
      await polygonNetwork.deletePolygon(formattedPolygonId);
      setPolygons(prevPolygons => {
        const updatedPolygons = { ...prevPolygons };
        const keyToDelete = Object.keys(updatedPolygons).find(key => key.replace(/-/g, '') === formattedPolygonId);
        if (keyToDelete) {
          delete updatedPolygons[keyToDelete];
        }
        return updatedPolygons;
      });
    } catch (error) {
      console.error('Error deleting polygon:', error);
    }
  };

  const handleNameEdit = async (id, newName) => {
    try {
      const polygon = polygons[id];
      const updatedPolygon = await polygonNetwork.updatePolygon(id, newName, polygon.geoJson);
      setPolygons(prevPolygons => ({
        ...prevPolygons,
        [id]: {
          ...prevPolygons[id],
          name: updatedPolygon.name,
        }
      }));
    } catch (error) {
      console.error('Error updating polygon name:', error);
    }
  };

  const handleShareLink = async () => {
    try {
      const sessionId = sessionStorage.getItem('sessionId');
      const sessionUrl = await sessionNetwork.getSessionUrl(sessionId);
      navigator.clipboard.writeText(sessionUrl);
      alert('Shareable link copied to clipboard!');
    } catch (error) {
      console.error('Error generating share link:', error);
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="container">
        <PolygonPanel polygons={polygons} onEdit={handleNameEdit} onShareLink={handleShareLink} />
        <div className="map-container">
          <Map openModal={openModal} setCurrentPolygon={setCurrentPolygon} handleUpdate={handleUpdate} handleDelete={handleDelete} polygons={polygons} />
        </div>
        <PolygonModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default App;
