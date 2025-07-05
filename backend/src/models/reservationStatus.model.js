import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ReservationStatus = sequelize.define('ReservationStatus', {
  estado_reserva: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    //autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,
  underscored: true,
  tableName: 'estado_reserva',
});

export default ReservationStatus;