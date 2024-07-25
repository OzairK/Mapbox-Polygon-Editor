import express from 'express';
import db from './models/index.js';

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello from backend');
});


// Sync models and start the server
const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.log('Database synchronized');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
