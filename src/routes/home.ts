// src/routes/home.ts
import { Router, Request, Response } from 'express';
import * as ArticleController from '../controllers/articleController';
import * as Article from '../models/articleModel'

const router = Router();

// Home route
router.get('/', ArticleController.getAllArticles, (req: Request, res: Response) => {
  res.render('home', { title: 'Home Page'});
});

// Search route
router.get('/search', async (req: Request, res: Response) => {
  try {
    // Fetch all articles
    const articles = await Article.fetchAllArticles();



    // Call the filterArticles method with the query
    const filteredArticles = ArticleController.filterArticles(req, articles);

    console.log("Filtered articles:", filteredArticles);

    // Render the admin page with filtered articles
    res.render('home', { title: 'Home Page', articles: filteredArticles });
  } catch (error) {
    console.error('Error during search route:', error);
    res.status(500).send('Error fetching articles');
  }
});

export default router;


