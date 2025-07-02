import sequelize from '../config/db.js';
import User from './user.model.js';
import UserType from './userType.model.js';
import Space from './space.model.js';
import SpaceType from './spaceType.model.js';
import Reservation from './reservation.model.js';
import ReservationStatus from './reservationStatus.model.js';

// Relaciones
User.belongsTo(UserType, { foreignKey: 'tipo_usuario', as: 'tipoUsuario' });
UserType.hasMany(User, { foreignKey: 'tipo_usuario' });

Space.belongsTo(SpaceType, { foreignKey: 'tipo_espacio', as: 'tipoEspacio' });
SpaceType.hasMany(Space, { foreignKey: 'tipo_espacio' });

Reservation.belongsTo(User, { foreignKey: 'id_usuario', as: 'usuario' });
User.hasMany(Reservation, { foreignKey: 'id_usuario' });

Reservation.belongsTo(Space, { foreignKey: 'id_espacio', as: 'espacio' });
Space.hasMany(Reservation, { foreignKey: 'id_espacio' });

Reservation.belongsTo(ReservationStatus, { 
  foreignKey: 'estado_reserva', 
  as: 'estadoReserva' 
});
ReservationStatus.hasMany(Reservation, { foreignKey: 'estado_reserva' });

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