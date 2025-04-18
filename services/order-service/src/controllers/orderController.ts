import { Request, Response } from 'express';
import axios from 'axios';
import Order, { IOrder } from '../models/Order';
import { logger } from '../config/logger';

const { USER_SERVICE_URL, PRODUCT_SERVICE_URL } = process.env;

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, totalAmount } = req.body;

    // Verify user exists
    try {
      await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
    } catch (error) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify products exist and check availability
    for (const item of items) {
      try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/${item.productId}`);
        const product = response.data;
        if (product.stock < item.quantity) {
          return res.status(400).json({ 
            error: `Insufficient stock for product ${item.productId}` 
          });
        }
      } catch (error) {
        return res.status(404).json({ 
          error: `Product ${item.productId} not found` 
        });
      }
    }

    const order = new Order({
      userId,
      items,
      totalAmount,
      status: 'pending'
    });

    await order.save();
    logger.info(`Order created successfully: ${order._id}`);

    res.status(201).json(order);
  } catch (error) {
    logger.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    logger.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    logger.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    logger.info(`Order ${order._id} status updated to ${status}`);
    res.json(order);
  } catch (error) {
    logger.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'completed') {
      return res.status(400).json({ error: 'Cannot cancel completed order' });
    }

    order.status = 'cancelled';
    await order.save();

    logger.info(`Order ${order._id} cancelled`);
    res.json(order);
  } catch (error) {
    logger.error('Error cancelling order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 