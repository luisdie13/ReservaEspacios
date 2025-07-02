import express from 'express';
const router = express.Router();
import {
  getReservations,
  getMyReservations,
  getReservationById,
  createReservation,
  cancelReservation,
  deleteReservation
} from '../controllers/reservation.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

router.route('/')
  .get(protect, admin, getReservations)
  .post(protect, createReservation);

router.get('/myreservations', protect, getMyReservations);

router.route('/:id')
  .get(protect, getReservationById)
  .delete(protect, admin, deleteReservation);

router.put('/:id/cancel', protect, cancelReservation);

export default router;