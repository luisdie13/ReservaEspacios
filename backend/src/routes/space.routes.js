import express from 'express';
import {
  getSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace
} from '../controllers/space.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getSpaces)
  .post(protect, admin, createSpace);

router.route('/:id')
  .get(getSpaceById)
  .put(protect, admin, updateSpace)
  .delete(protect, admin, deleteSpace);

export default router;