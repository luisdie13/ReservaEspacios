import { Reservation, Space, User, ReservationStatus } from '../models/index.js';
import { Op } from 'sequelize';

// @desc    Obtener todas las reservas
// @route   GET /api/reservations
// @access  Private/Admin
const getReservations = async (req, res) => {
  const reservations = await Reservation.findAll({
    include: [
      {
        model: User,
        as: 'usuario',
        attributes: ['nombre', 'apellido', 'email'],
      },
      {
        model: Space,
        as: 'espacio',
        attributes: ['nombre', 'ubicacion'],
      },
      {
        model: ReservationStatus,
        as: 'estadoReserva',
        attributes: ['nombre'],
      },
    ],
    order: [['fecha_reserva', 'ASC'], ['hora_inicio', 'ASC']],
  });
  res.json(reservations);
};

// @desc    Obtener reservas de un usuario
// @route   GET /api/reservations/myreservations
// @access  Private
const getMyReservations = async (req, res) => {
  const reservations = await Reservation.findAll({
    where: { id_usuario: req.user.id_usuario },
    include: [
      {
        model: Space,
        as: 'espacio',
        attributes: ['nombre', 'ubicacion'],
      },
      {
        model: ReservationStatus,
        as: 'estadoReserva',
        attributes: ['nombre'],
      },
    ],
    order: [['fecha_reserva', 'ASC'], ['hora_inicio', 'ASC']],
  });
  res.json(reservations);
};

// @desc    Obtener reserva por ID
// @route   GET /api/reservations/:id
// @access  Private
const getReservationById = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'usuario',
        attributes: ['nombre', 'apellido', 'email'],
      },
      {
        model: Space,
        as: 'espacio',
        attributes: ['nombre', 'ubicacion'],
      },
      {
        model: ReservationStatus,
        as: 'estadoReserva',
        attributes: ['nombre'],
      },
    ],
  });

  if (reservation) {
    // Solo el usuario que hizo la reserva o un admin puede verla
    if (
      reservation.id_usuario === req.user.id_usuario ||
      req.user.tipo_usuario === 'admin'
    ) {
      res.json(reservation);
    } else {
      res.status(403);
      throw new Error('No autorizado para ver esta reserva');
    }
  } else {
    res.status(404);
    throw new Error('Reserva no encontrada');
  }
};

// @desc    Crear una reserva
// @route   POST /api/reservations
// @access  Private
const createReservation = async (req, res) => {
  const { id_espacio, fecha_reserva, hora_inicio, hora_fin } = req.body;

  // Verificar si el espacio existe
  const space = await Space.findByPk(id_espacio);
  if (!space) {
    res.status(404);
    throw new Error('Espacio no encontrado');
  }

  // Verificar si el espacio está disponible
  if (!space.estado) {
    res.status(400);
    throw new Error('El espacio no está disponible para reservas');
  }

  // Verificar si ya existe una reserva en ese horario
  const existingReservation = await Reservation.findOne({
    where: {
      id_espacio,
      fecha_reserva,
      [Op.or]: [
        {
          hora_inicio: { [Op.between]: [hora_inicio, hora_fin] },
        },
        {
          hora_fin: { [Op.between]: [hora_inicio, hora_fin] },
        },
        {
          [Op.and]: [
            { hora_inicio: { [Op.lte]: hora_inicio } },
            { hora_fin: { [Op.gte]: hora_fin } },
          ],
        },
      ],
    },
  });

  if (existingReservation) {
    res.status(400);
    throw new Error('El espacio ya está reservado en ese horario');
  }

  const reservation = await Reservation.create({
    id_usuario: req.user.id_usuario,
    id_espacio,
    fecha_reserva,
    hora_inicio,
    hora_fin,
    estado_reserva: 1, // Estado pendiente
  });

  res.status(201).json(reservation);
};

// @desc    Cancelar reserva
// @route   PUT /api/reservations/:id/cancel
// @access  Private
const cancelReservation = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);

  if (reservation) {
    // Solo el usuario que hizo la reserva o un admin puede cancelarla
    if (
      reservation.id_usuario === req.user.id_usuario ||
      req.user.tipo_usuario === 'admin'
    ) {
      reservation.estado_reserva = 3; // Estado cancelado
      await reservation.save();
      res.json({ message: 'Reserva cancelada' });
    } else {
      res.status(403);
      throw new Error('No autorizado para cancelar esta reserva');
    }
  } else {
    res.status(404);
    throw new Error('Reserva no encontrada');
  }
};

// @desc    Eliminar reserva
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
const deleteReservation = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);

  if (reservation) {
    await reservation.destroy();
    res.json({ message: 'Reserva eliminada' });
  } else {
    res.status(404);
    throw new Error('Reserva no encontrada');
  }
};

export {
  getReservations,
  getMyReservations,
  getReservationById,
  createReservation,
  cancelReservation,
  deleteReservation
};