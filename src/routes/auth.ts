// src/routes/auth.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Login route
router.get('/login', (req: Request, res: Response) => {
  res.render('login', { title: 'Admin Login' });
});

// Login POST (handle login form submission)
router.post('/login', (req: Request, res: Response) => {
  // Handle login logic here
  res.redirect('/admin');
});

export default router;
