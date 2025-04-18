import { Router } from 'express';
import {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  cancelOrder
} from '../controllers/orderController';
import { validateRequest, orderSchema } from '../middleware/validation';

const router = Router();

// Create a new order
router.post('/', validateRequest(orderSchema), createOrder);

// Get a specific order
router.get('/:id', getOrder);

// Get all orders for a user
router.get('/user/:userId', getUserOrders);

// Update order status
router.patch('/:id/status', updateOrderStatus);

// Cancel an order
router.post('/:id/cancel', cancelOrder);

export default router; 