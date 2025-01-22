import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'e8c4f6d4d7f8f4a7b8c2e7d6f1b5d9e4f7a2c6b8e9d8a7e6c4f0d9e7f8b6a5'; // Secret key for JWT verification

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // First, check for token in Authorization header
  const tokenFromHeader = req.header('Authorization')?.replace('Bearer ', '');

  // If not found in header, check for token in cookies
  const tokenFromCookie = req.cookies.token;

  // Use token from header if available, otherwise use token from cookies
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.redirect('/auth'); // If no token is provided, redirect to the login page
  }

  try {
    // Verify the token
    const user = jwt.verify(token, secretKey);
    req.user = user; // Store the user info in the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.redirect('/auth'); // If the token is invalid, redirect to the login page
  }
};
