// src/routes/admin.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Admin dashboard route
router.get('/', (req: Request, res: Response) => {
  res.render('admin-dashboard', { title: 'Admin Dashboard' });
});

// Admin: Create Article route
router.get('/create', (req: Request, res: Response) => {
  res.render('create-article', { title: 'Create New Article' });
});

export default router;
