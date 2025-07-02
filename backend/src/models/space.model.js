import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Space = sequelize.define('Space', {
  id_espacio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  tipo_espacio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  underscored: true,
  tableName: 'espacios',
});

export default Space;