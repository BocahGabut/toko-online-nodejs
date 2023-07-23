import bcrypt from 'bcryptjs';
const saltRounds = 15;
import Jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error encrypting password');
  }
}

export const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
  }

  Jwt.verify(token.split(' ')[1], SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }

    try {
      const [result] = await User.getById(decodedToken.userId);
      if (result.length < 1) {
        return Response.errorResp(res, "Authentication failed. User not found.", 404);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
};