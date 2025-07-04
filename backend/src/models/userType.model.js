import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserType = sequelize.define('UserType', {
  tipo_usuario: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    // autoIncrement: true, // REMOVE THIS LINE - autoIncrement is for INTEGER/BIGINT primary keys
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  underscored: true,
  tableName: 'tipo_usuario',
});

export default UserType;