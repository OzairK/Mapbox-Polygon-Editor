'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.hasMany(models.Polygon, {
        foreignKey: 'session_id',
        as: 'polygons'
      });
    }
  }
  Session.init({
    session_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    expires_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Session',
    timestamps: false
  });
  return Session;
};
