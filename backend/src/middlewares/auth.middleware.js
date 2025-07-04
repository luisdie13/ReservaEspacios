import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const protect = async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('--- DEBUG: Extracted Token ---');
      console.log(token); // show what jwt.verify is receiving
      console.log('------------------------------');


      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['contraseña'] },
      });
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token no válido, autorización denegada' });
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'No se proporcionó token, autorización denegada' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.tipo_usuario === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'No autorizado como administrador' });
  }
};

// Named exports instead of module.exports
export { protect, admin };