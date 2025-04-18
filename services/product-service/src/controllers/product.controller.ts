import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.service.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.service.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.service.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create product' });
      }
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.service.updateProduct(req.params.id, req.body);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to update product' });
      }
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.service.deleteProduct(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.service.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products by category' });
    }
  }

  async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== 'number') {
        res.status(400).json({ error: 'Quantity must be a number' });
        return;
      }

      const product = await this.service.updateStock(req.params.id, quantity);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to update stock' });
      }
    }
  }
} 