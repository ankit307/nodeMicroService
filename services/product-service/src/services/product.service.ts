import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../entities/product.entity';
import { AppDataSource } from '../config/database';

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository(AppDataSource);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    // Validate required fields
    if (!product.name || !product.price || !product.stock) {
      throw new Error('Name, price, and stock are required');
    }

    // Set default values
    const newProduct = {
      ...product,
      isActive: true,
    };

    return this.repository.create(newProduct);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    return this.repository.update(id, product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    return this.repository.delete(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.repository.findByCategory(category);
  }

  async updateStock(id: string, quantity: number): Promise<Product | null> {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock + quantity < 0) {
      throw new Error('Insufficient stock');
    }

    return this.repository.updateStock(id, quantity);
  }
} 