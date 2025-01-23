// src/routes/adminRouter.ts
import express from 'express';
import * as ArticleController from '../controllers/articleController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/upload';

const router = express.Router();

// Protect the /admin route with authentication middleware
router.get('/', authenticateJWT, ArticleController.AdmingetAllArticles);
router.post('/articles/create', authenticateJWT,upload.single('image'), ArticleController.createNewArticle);
router.put('/articles/update/:id', authenticateJWT,upload.single('image'), ArticleController.updateArticleById);
router.delete('/articles/delete/:id', authenticateJWT, ArticleController.deleteArticleById);
// In your route handler



export default router;
