import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SpaceType = sequelize.define('SpaceType', {
  tipo_espacio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,
  underscored: true,
  tableName: 'tipo_espacio',
});

export default SpaceType;