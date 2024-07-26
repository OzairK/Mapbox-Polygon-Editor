import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import PolygonPanel from './components/PolygonPanel';
import sessionNetwork from './network/sessionNetwork';
import PolygonModal from './components/PolygonModal';
import polygonNetwork from './network/polygonNetwork';

const handleEdit = () => {
  console.log('this is a edit');
};

function App() {
  useEffect(() => {
    const initializeSession = async () => {
      const sessionId = sessionStorage.getItem('sessionId');
      const sessionExpiresAt = sessionStorage.getItem('sessionExpiresAt');
      const isSessionValid = sessionExpiresAt && new Date(sessionExpiresAt) > new Date();

      if (!sessionId || !isSessionValid) {
        await sessionNetwork.createSession();
      }
    };

    initializeSession();
  }, []);

  const [polygons, setPolygons] = useState({});
  const [currentPolygon, setCurrentPolygon] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (polygon) => {
    setCurrentPolygon(polygon);
    setIsModalOpen(true);
  };

  const handleSave = async (name) => {
    try {
      const newPolygon = await polygonNetwork.createPolygon(currentPolygon.id, name, currentPolygon);
      setPolygons(prevPolygons => ({
        ...prevPolygons,
        [newPolygon.polygon_id]: {id: newPolygon.polygon_id, name: newPolygon.name, geoJson: newPolygon.geom} 
      }));
    } catch (error) {
      console.error('Error creating polygon:', error);
    } finally {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updatePolygon = (polygon) => {
    console.log(polygon);
  };

  return (
    <div className="App">
      <div className="container">
        <PolygonPanel polygons={polygons} onEdit={handleEdit} />
        <div className="map-container">
          <Map openModal={openModal} setCurrentPolygon={setCurrentPolygon} />
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
