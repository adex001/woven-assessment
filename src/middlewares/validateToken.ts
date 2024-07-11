import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/token';

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }
  try {
    const user = await verifyToken(token);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
}

export default authenticateToken;
