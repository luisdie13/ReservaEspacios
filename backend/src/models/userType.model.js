import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserType = sequelize.define('UserType', {
  tipo_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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