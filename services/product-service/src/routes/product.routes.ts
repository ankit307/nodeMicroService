import { Router, Request, Response } from 'express';
import { ProductRepository } from '../repositories/product.repository';
import { AppDataSource } from '../config/database';

const router = Router();
const productRepository = new ProductRepository(AppDataSource);

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productRepository.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await productRepository.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create product
router.post('/', async (req: Request, res: Response) => {
  try {
    const product = await productRepository.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const product = await productRepository.update(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await productRepository.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Get products by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const products = await productRepository.findByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category' });
  }
});

// Update product stock
router.patch('/:id/stock', async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const product = await productRepository.updateStock(req.params.id, quantity);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error instanceof Error && error.message === 'Insufficient stock') {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    res.status(500).json({ message: 'Error updating stock' });
  }
});

export default router; 