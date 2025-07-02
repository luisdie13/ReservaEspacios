import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await user.validPassword(password))) {
    res.json({
      id: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
      token: generateToken(user.id_usuario),
    });
  } else {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { nombre, apellido, email, password, telefono } = req.body;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  const user = await User.create({
    nombre,
    apellido,
    email,
    contraseña: password,
    telefono,
    tipo_usuario: 'user',
  });

  if (user) {
    res.status(201).json({
      id: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
      token: generateToken(user.id_usuario),
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario no válidos');
  }
};

// @desc    Obtener perfil de usuario
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id_usuario, {
    attributes: { exclude: ['contraseña'] },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
};

export {
  loginUser,
  registerUser,
  getUserProfile
};