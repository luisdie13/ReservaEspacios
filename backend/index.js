import dotenv from 'dotenv';

dotenv.config();

import app from './app.js'; // Import your Express app configuration
import { sequelize } from './src/models/index.js'; // Import sequelize instance and models

const PORT = process.env.PORT || 3000; // Define the port for your server

// Function to connect to the database and start the server
const startServer = async () => {
  try {
    // Authenticate with the database (already done in config/db.js, but good to have a check)
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Synchronize all models with the database
    // { force: true } will drop existing tables and recreate them.
    // Use with CAUTION in production, only for development or migrations.
    // For production, consider using migrations instead of force: true.
    await sequelize.sync({ force: false }); // Set to `true` if you want to drop and recreate tables on every restart
    console.log('All models were synchronized successfully.');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database or sync models:', error);
    process.exit(1); // Exit the process if database connection/sync fails
  }
};

// Call the function to start the server
startServer();