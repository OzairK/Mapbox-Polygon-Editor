import { Model, DataTypes } from 'sequelize';

class Session extends Model {
  static init(sequelize) {
    return super.init({
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
  }

  static associate(models) {
    Session.hasMany(models.Polygon, {
      foreignKey: 'session_id',
      as: 'polygons'
    });
  }
}

export default Session;
