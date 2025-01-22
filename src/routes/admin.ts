// src/routes/adminRouter.ts
import express from 'express';
import * as ArticleController from '../controllers/articleController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = express.Router();

// Protect the /admin route with authentication middleware
router.get('/', authenticateJWT, ArticleController.getAllArticles);
router.post('/articles/create', authenticateJWT, ArticleController.createNewArticle);
router.put('/articles/update/:id', authenticateJWT, ArticleController.updateArticleById);
router.delete('/articles/delete/:id', authenticateJWT, ArticleController.deleteArticleById);

export default router;
