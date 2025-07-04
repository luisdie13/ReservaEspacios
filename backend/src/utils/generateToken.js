import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  console.log('Signing with JWT_SECRET (from generateToken.js):', process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;