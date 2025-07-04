import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import UserType from './userType.model.js'; // <--- IMPORT THE USERTYPE MODEL

const User = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tipo_usuario: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'user',
    // We remove the explicit `references` here, as associations handle this
    // It's already in the correct type (STRING(20)) as per your TipoUsuario model
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.contraseña) {
        const salt = await bcrypt.genSalt(10);
        user.contraseña = await bcrypt.hash(user.contraseña, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('contraseña')) {
        const salt = await bcrypt.genSalt(10);
        user.contraseña = await bcrypt.hash(user.contraseña, salt);
      }
    },
  },
  timestamps: true,
  underscored: true,
  tableName: 'usuarios',
});

// Define the association
// A User belongs to a UserType. The foreign key 'tipo_usuario' will be in the 'usuarios' table.
User.belongsTo(UserType, {
  foreignKey: 'tipo_usuario', // This is the column in the User model that acts as the FK
  targetKey: 'tipo_usuario',  // This is the primary key column in the UserType model that it references
  as: 'userTypeDetail',       // An alias to use when including the association (e.g., User.findOne({ include: 'userTypeDetail' }))
  onDelete: 'NO ACTION',      // or 'RESTRICT', 'SET NULL', 'CASCADE'
  onUpdate: 'CASCADE'         // or 'RESTRICT', 'SET NULL', 'CASCADE'
});

// Optionally, define the inverse association in UserType (usually done in userType.model.js or a central index)
// UserType.hasMany(User, { foreignKey: 'tipo_usuario', as: 'users' });

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.contraseña);
};

export default User;