import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

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

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.contraseña);
};

export default User;