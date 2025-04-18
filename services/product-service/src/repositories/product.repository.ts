import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

export class ProductRepository {
  private repository: Repository<Product>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Product | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.repository.create(productData);
    return this.repository.save(product);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) {
      return null;
    }
    Object.assign(product, productData);
    return this.repository.save(product);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.repository.find({ where: { category } });
  }

  async updateStock(id: string, quantity: number): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) {
      return null;
    }

    if (product.stock + quantity < 0) {
      throw new Error('Insufficient stock');
    }

    product.stock += quantity;
    return this.repository.save(product);
  }
} 