import sequelize from '../config/db.js';
import User from './user.model.js';
import UserType from './userType.model.js';
import Space from './space.model.js';
import SpaceType from './spaceType.model.js';
import Reservation from './reservation.model.js';
import ReservationStatus from './reservationStatus.model.js';

// Relaciones
// User and UserType
User.belongsTo(UserType, { foreignKey: 'tipo_usuario', targetKey: 'tipo_usuario', as: 'tipoUsuario' });
UserType.hasMany(User, { foreignKey: 'tipo_usuario', sourceKey: 'tipo_usuario', as: 'users' }); // Added sourceKey and as alias

// Space and SpaceType
Space.belongsTo(SpaceType, { foreignKey: 'tipo_espacio', targetKey: 'tipo_espacio', as: 'tipoEspacio' });
SpaceType.hasMany(Space, { foreignKey: 'tipo_espacio', sourceKey: 'tipo_espacio', as: 'spaces' }); // Added sourceKey and as alias

// Reservation and User
Reservation.belongsTo(User, { foreignKey: 'id_usuario', targetKey: 'id_usuario', as: 'usuario' }); // Added targetKey
User.hasMany(Reservation, { foreignKey: 'id_usuario', sourceKey: 'id_usuario', as: 'reservations' }); // Added sourceKey and as alias

// Reservation and Space
Reservation.belongsTo(Space, { foreignKey: 'id_espacio', targetKey: 'id_espacio', as: 'espacio' }); // Added targetKey
Space.hasMany(Reservation, { foreignKey: 'id_espacio', sourceKey: 'id_espacio', as: 'reservations' }); // Added sourceKey and as alias

// Reservation and ReservationStatus
Reservation.belongsTo(ReservationStatus, {
  foreignKey: 'estado_reserva',
  targetKey: 'estado_reserva', // Assuming 'estado_reserva' is the primary key in ReservationStatus
  as: 'estadoReserva'
});
ReservationStatus.hasMany(Reservation, { foreignKey: 'estado_reserva', sourceKey: 'estado_reserva', as: 'reservations' }); // Added sourceKey and as alias

// Export as named exports
export {
  sequelize,
  User,
  UserType,
  Space,
  SpaceType,
  Reservation,
  ReservationStatus
};