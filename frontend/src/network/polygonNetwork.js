import api from './api';

const createPolygon = async (id, name, geoJson) => {
  const sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    throw new Error('Session ID not found');
  }

  const response = await api.post('/polygons', {
    id,
    name,
    geoJson
  });

  return response.data;
};

const updatePolygon = async (id, name, geoJson) => {
  const sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    throw new Error('Session ID not found');
  }

  const response = await api.put(`/polygons/${id}`, {
    name,
    geoJson
  });

  return response.data;
};

export default {
  createPolygon,
  updatePolygon,
};
