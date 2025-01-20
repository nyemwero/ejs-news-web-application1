// src/routes/articles.ts
import express from 'express';
import { getArticles } from '../controllers/articleController';

const router = express.Router();

router.get('/', getArticles);  // Route to get articles

export default router;
