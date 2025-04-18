import axios, { AxiosError, AxiosInstance } from 'axios';
import { logger } from '../config/logger';

export class ServiceClient {
  private client: AxiosInstance;
  private maxRetries: number;
  private retryDelay: number;

  constructor(baseURL: string, maxRetries = 3, retryDelay = 1000) {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      response => response,
      this.handleError.bind(this)
    );
  }

  private async handleError(error: AxiosError) {
    const config = error.config;
    if (!config) {
      return Promise.reject(error);
    }

    config.retryCount = (config.retryCount || 0) + 1;

    if (config.retryCount <= this.maxRetries) {
      logger.warn(`Retrying request to ${config.url} (attempt ${config.retryCount}/${this.maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      return this.client(config);
    }

    logger.error(`Request failed after ${this.maxRetries} retries:`, {
      url: config.url,
      method: config.method,
      status: error.response?.status,
      data: error.response?.data
    });

    return Promise.reject(error);
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new ServiceError('Resource not found', 404);
        }
        throw new ServiceError(
          error.response?.data?.message || 'Service request failed',
          error.response?.status || 500
        );
      }
      throw new ServiceError('Unknown error occurred', 500);
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ServiceError(
          error.response?.data?.message || 'Service request failed',
          error.response?.status || 500
        );
      }
      throw new ServiceError('Unknown error occurred', 500);
    }
  }
}

export class ServiceError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ServiceError';
  }
} 