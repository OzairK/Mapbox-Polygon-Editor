import polygonService from '../services/polygonService.js';

const createPolygon = async (req, res) => {
  const { name, geoJson, id } = req.body;
  try {
    const polygon = await polygonService.createPolygon(name, geoJson, id);
    res.status(201).json(polygon);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePolygon = async (req, res) => {
  const { id } = req.params;
  const { name, geoJson } = req.body;
  try {
    const updatedPolygon = await polygonService.updatePolygon(id, name, geoJson);
    if (updatedPolygon) {
      res.status(200).json(updatedPolygon);
    } else {
      res.status(404).json({ error: 'Polygon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deletePolygon = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await polygonService.deletePolygon(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Polygon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { createPolygon, updatePolygon, deletePolygon };
