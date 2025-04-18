import mongoose from 'mongoose';
import { logger } from './logger';

const {
  MONGODB_HOST = 'localhost',
  MONGODB_PORT = '27017',
  MONGODB_DB = 'order_service',
  MONGODB_USER,
  MONGODB_PASSWORD,
} = process.env;

const getMongoURI = (): string => {
  if (MONGODB_USER && MONGODB_PASSWORD) {
    return `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;
  }
  return `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;
};

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = getMongoURI();
    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
}; 