'use strict';

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Polygon from './polygon.js';
import Session from './session.js';

dotenv.config();


const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);


db.Polygon = Polygon.init(sequelize);
db.Session = Session.init(sequelize);

Polygon.associate(db);
Session.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
