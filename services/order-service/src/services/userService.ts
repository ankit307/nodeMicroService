import { ServiceClient, ServiceError } from '../utils/serviceClient';
import { logger } from '../config/logger';

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export class UserService {
  private client: ServiceClient;

  constructor(baseURL: string) {
    this.client = new ServiceClient(baseURL);
  }

  async getUser(userId: string): Promise<User> {
    try {
      return await this.client.get<User>(`/users/${userId}`);
    } catch (error) {
      if (error instanceof ServiceError) {
        if (error.statusCode === 404) {
          logger.warn(`User not found: ${userId}`);
          throw new Error('User not found');
        }
      }
      logger.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  async validateUser(userId: string): Promise<boolean> {
    try {
      const user = await this.getUser(userId);
      return user.isActive;
    } catch (error) {
      return false;
    }
  }
} 