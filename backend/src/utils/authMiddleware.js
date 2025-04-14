import jwt from 'jsonwebtoken';
import { secretKey } from '../configuration/jwtConfig.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Token not found" });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized: Invalid token format" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }

    req.user = user;
    next();
  });
}
