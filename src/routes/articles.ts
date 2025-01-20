// src/routes/articles.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Get all articles
router.get('/', (req: Request, res: Response) => {
  res.render('articles', { title: 'Articles List' });
});

// Get a single article
router.get('/:id', (req: Request, res: Response) => {
  const articleId = req.params.id;
  res.render('article', { title: `Article ${articleId}` });
});

export default router;
