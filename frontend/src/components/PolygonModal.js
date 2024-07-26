import React, { useState } from 'react';
import Modal from 'react-modal';
import './PolygonModal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
};

Modal.setAppElement('#root');

const PolygonModal = ({ isOpen, onRequestClose, onSave }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    onSave(name);
    onRequestClose();
    setName('')
  };

  const handleCancel = () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Polygon Name Modal"
    >
      <div className="modal-content">
        <h2 className="modal-header">Enter Polygon Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Polygon Name"
          className="modal-input"
        />
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={handleCancel}>Cancel</button>
          <button className="modal-button save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default PolygonModal;
