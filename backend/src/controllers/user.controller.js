import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';

// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['contraseña'] },
  });
  res.json(users);
};

// @desc    Obtener usuario por ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['contraseña'] },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
};

// @desc    Actualizar usuario
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    user.nombre = req.body.nombre || user.nombre;
    user.apellido = req.body.apellido || user.apellido;
    user.email = req.body.email || user.email;
    user.telefono = req.body.telefono || user.telefono;
    user.tipo_usuario = req.body.tipo_usuario || user.tipo_usuario;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.contraseña = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id_usuario,
      nombre: updatedUser.nombre,
      apellido: updatedUser.apellido,
      email: updatedUser.email,
      telefono: updatedUser.telefono,
      tipo_usuario: updatedUser.tipo_usuario,
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
};

// @desc    Eliminar usuario
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
};

export {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};