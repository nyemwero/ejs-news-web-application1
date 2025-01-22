import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import { getUserByUsername } from '../models/userModel';

export const validateLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const login = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    const { username, password } = req.body;
  
    try {
      const user = await getUserByUsername(username);
      
      if (!user) {
        res.status(400).json({ message: 'Invalid username or password' });
        return;
      }
  
      const isMatch = (user.password === password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid username or password' });
        return;
      }
  
      const token = jwt.sign(
        { id: user.id, username: user.username }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '1h' }
      );

      // Set token as cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1 hour in milliseconds
      });

      res.redirect('/admin');
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};


export const logout = (req: Request, res: Response): void => {
    // Clear the cookie storing the JWT token
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  
    // Redirect to login page or any other public page
    res.redirect('/home'); // Adjust as necessary
  };