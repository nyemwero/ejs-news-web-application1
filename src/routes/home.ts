// src/routes/home.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Home route
router.get('/', (req: Request, res: Response) => {
  res.render('home', { title: 'Home Page' });
});

export default router;
