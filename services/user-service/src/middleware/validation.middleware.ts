import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console()
  ]
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    logger.error('Validation error: Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    logger.error('Validation error: Invalid field types');
    return res.status(400).json({ error: 'Invalid field types' });
  }

  if (password.length < 6) {
    logger.error('Validation error: Password too short');
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    logger.error('Validation error: Invalid email format');
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
}; 