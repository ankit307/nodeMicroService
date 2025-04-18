import { Request, Response } from 'express';
import { User, IUser } from '../models/user.model';
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

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      await user.save();
      logger.info('User created successfully');
      res.status(201).json(user);
    } catch (error) {
      logger.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      logger.info('Users retrieved successfully');
      res.json(users);
    } catch (error) {
      logger.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Error retrieving users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info('User retrieved successfully');
      res.json(user);
    } catch (error) {
      logger.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Error retrieving user' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info('User updated successfully');
      res.json(user);
    } catch (error) {
      logger.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info('User deleted successfully');
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      logger.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
} 