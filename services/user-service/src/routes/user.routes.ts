import express from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUser } from '../middleware/validation.middleware';

const router = express.Router();
const userController = new UserController();

// User routes
router.post('/', validateUser, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router; 