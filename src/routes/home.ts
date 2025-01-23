// src/routes/home.ts
import { Router, Request, Response } from 'express';
import * as ArticleController from '../controllers/articleController';

const router = Router();

// Home route
router.get('/', ArticleController.getAllArticles, (req: Request, res: Response) => {
  res.render('home', { title: 'Home Page'});
});

export default router;
