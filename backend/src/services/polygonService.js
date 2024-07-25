import  Polygon from '../models/polygon.js'

const createPolygon = async (name, geoJson, id) => {
  const polygon = await Polygon.create({
    polygon_id: id,
    session_id: '9f103cb4-df1e-47af-9e66-facd325ffcc9',
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

export default {
  createPolygon,
  updatePolygon,
  deletePolygon
};
