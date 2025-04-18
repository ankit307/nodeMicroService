import { ServiceClient, ServiceError } from '../utils/serviceClient';
import { logger } from '../config/logger';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
}

export class ProductService {
  private client: ServiceClient;

  constructor(baseURL: string) {
    this.client = new ServiceClient(baseURL);
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      return await this.client.get<Product>(`/products/${productId}`);
    } catch (error) {
      if (error instanceof ServiceError) {
        if (error.statusCode === 404) {
          logger.warn(`Product not found: ${productId}`);
          throw new Error('Product not found');
        }
      }
      logger.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  async validateProduct(productId: string, quantity: number): Promise<boolean> {
    try {
      const product = await this.getProduct(productId);
      return product.isActive && product.stock >= quantity;
    } catch (error) {
      return false;
    }
  }

  async updateStock(productId: string, quantity: number): Promise<void> {
    try {
      await this.client.post(`/products/${productId}/stock`, { quantity });
    } catch (error) {
      logger.error('Error updating product stock:', error);
      throw new Error('Failed to update product stock');
    }
  }
} 