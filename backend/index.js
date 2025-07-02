import app from './app.js';
import { sequelize } from './src/models/index.js';

const PORT = process.env.PORT || 5000;

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});