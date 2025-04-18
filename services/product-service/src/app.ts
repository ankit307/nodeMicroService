import express from 'express';
import { json } from 'body-parser';
import { AppDataSource, initializeDatabase } from './config/database';
import productRoutes from './routes/product.routes';

const app = express();

app.use(json());

// Initialize database connection
initializeDatabase().catch((error) => {
  console.error('Error during database initialization:', error);
  process.exit(1);
});

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 