import express from 'express';
import db from './models/index.js';
import polygonRoutes from './routes/polygonRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'
import sessionMiddleware from './middleware/sessionMiddleware.js';

const app = express();

//health check
app.get('/live', (req, res) => {
  res.send('hello from backend');
});

// Routes and Middleware
app.use(express.json());
app.use('/api/sessions', sessionRoutes);
// confirm the session exists and is not expired
app.use(sessionMiddleware)
app.use('/api/polygons', polygonRoutes);

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
