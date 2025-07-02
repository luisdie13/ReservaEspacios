import { Space, SpaceType } from '../models/index.js';

// @desc    Obtener todos los espacios
// @route   GET /api/spaces
// @access  Public
const getSpaces = async (req, res) => {
  const spaces = await Space.findAll({
    include: {
      model: SpaceType,
      as: 'tipoEspacio',
      attributes: ['nombre'],
    },
  });
  res.json(spaces);
};

// @desc    Obtener espacio por ID
// @route   GET /api/spaces/:id
// @access  Public
const getSpaceById = async (req, res) => {
  const space = await Space.findByPk(req.params.id, {
    include: {
      model: SpaceType,
      as: 'tipoEspacio',
      attributes: ['nombre'],
    },
  });

  if (space) {
    res.json(space);
  } else {
    res.status(404);
    throw new Error('Espacio no encontrado');
  }
};

// @desc    Crear un espacio
// @route   POST /api/spaces
// @access  Private/Admin
const createSpace = async (req, res) => {
  const { nombre, tipo_espacio, capacidad, ubicacion, estado, descripcion } = req.body;

  const space = await Space.create({
    nombre,
    tipo_espacio,
    capacidad,
    ubicacion,
    estado,
    descripcion,
  });

  if (space) {
    res.status(201).json(space);
  } else {
    res.status(400);
    throw new Error('Datos de espacio no válidos');
  }
};

// @desc    Actualizar espacio
// @route   PUT /api/spaces/:id
// @access  Private/Admin
const updateSpace = async (req, res) => {
  const space = await Space.findByPk(req.params.id);

  if (space) {
    space.nombre = req.body.nombre || space.nombre;
    space.tipo_espacio = req.body.tipo_espacio || space.tipo_espacio;
    space.capacidad = req.body.capacidad || space.capacidad;
    space.ubicacion = req.body.ubicacion || space.ubicacion;
    space.estado = req.body.estado !== undefined ? req.body.estado : space.estado;
    space.descripcion = req.body.descripcion || space.descripcion;

    const updatedSpace = await space.save();

    res.json(updatedSpace);
  } else {
    res.status(404);
    throw new Error('Espacio no encontrado');
  }
};

// @desc    Eliminar espacio
// @route   DELETE /api/spaces/:id
// @access  Private/Admin
const deleteSpace = async (req, res) => {
  const space = await Space.findByPk(req.params.id);

  if (space) {
    await space.destroy();
    res.json({ message: 'Espacio eliminado' });
  } else {
    res.status(404);
    throw new Error('Espacio no encontrado');
  }
};

export {
  getSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace
};