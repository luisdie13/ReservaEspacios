import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('Attempting to connect with password:', process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost', // Use process.env.DB_HOST if available, else fallback to 'localhost'
    dialect: 'postgres',
    logging: false,
    port: process.env.DB_PORT || 5432 // Use process.env.DB_PORT if available, else fallback to 5432
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

export default sequelize;