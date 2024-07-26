import  Polygon from '../models/polygon.js'

const createPolygon = async (name, geoJson, id, sessionId) => {
  const polygon = await Polygon.create({
    polygon_id: id,
    session_id: sessionId,
    name,
    geom: geoJson.geometry
  });
  return polygon;
};

const updatePolygon = async (id, name, geoJson) => {
  const polygon = await Polygon.findByPk(id);
  if (polygon) {
    polygon.name = name;
    polygon.geom = geoJson.geometry;
    await polygon.save();
    return polygon;
  }
  return null;
};

const deletePolygon = async (id) => {
  const polygon = await Polygon.findByPk(id);
  if (polygon) {
    await polygon.destroy();
    return true;
  }
  return false;
};

const getAllPolygons = async (sessionId) => {
  const polygons = await Polygon.findAll({
    where: {
      session_id: sessionId
    }
  });
  return polygons;
};

export default {
  createPolygon,
  updatePolygon,
  deletePolygon,
  getAllPolygons
};
