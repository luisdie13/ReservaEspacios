import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Reservation = sequelize.define('Reservation', {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_espacio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_reserva: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado_reserva: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 1, // 1 = Pendiente, 2 = Confirmada, 3 = Cancelada
  },
}, {
  timestamps: true,
  underscored: true,
  tableName: 'reservas',
});

export default Reservation;