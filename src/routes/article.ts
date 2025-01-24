// src/routes/adminRouter.ts
import express from 'express';
import * as ArticleController from '../controllers/articleController';
import * as ArticleModel from '../models/articleModel';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const articles = await ArticleModel.fetchAllArticles();

        if (articles.length < 1) {
            // Redirect if no articles are available
            return res.redirect('/home');
        }

        // Sort articles by ID in ascending order (lowest ID first)
        const sortedArticles = articles.sort((a, b) => a.id - b.id);

        // Retrieve the lowest article
        const article = sortedArticles[0];
        
        // Get the next and previous articles
        const nextArticle = sortedArticles[1] || null; // Default to null if no next article
        const prevArticle = sortedArticles[sortedArticles.length - 1] || null; // Default to null if no prev article


   
        // Render the article detail page with navigation
        res.render('articleDetail', {
            article: article,
            nextId: nextArticle ? nextArticle.id : null, // Pass nextId if available
            previousId: prevArticle ? prevArticle.id : null // Pass previousId if available
        });
    } catch (error) {
        console.error('Error fetching article and navigation:', error);
        res.status(500).send('Error fetching article and navigation');
    }
});

  router.get('/:id', async (req, res) => {
    const articleId = req.params.id;
  
    try {
      // Fetch the current article from the database
      const article = await ArticleModel.fetchArticleById(Number(articleId));
  
      // Fetch all articles to determine next and previous
      const articles = await ArticleModel.fetchAllArticles();
  
      // Sort articles by ID in ascending order (lowest ID first)
      const sortedArticles = articles.sort((a, b) => a.id - b.id);
      
      // Find the index of the current article in the sorted array
      const articleIndex = sortedArticles.findIndex((a) => a.id === Number(articleId));
  
      // Get the next and previous articles using the index
      const nextArticle = sortedArticles[articleIndex + 1];
      const prevArticle = sortedArticles[articleIndex - 1];
   
      // Render the article detail page, passing next and previous article IDs
      res.render('articleDetail', {
        article: article,
        nextArticle: nextArticle,
        prevArticle: prevArticle,
        nextId: nextArticle ? nextArticle.id : null, // Pass nextId if available
        previousId: prevArticle ? prevArticle.id : null // Pass previousId if available
      });
    } catch (error) {
      console.error('Error fetching article and navigation:', error);
      res.status(500).send('Error fetching article and navigation');
    }
  });
  
  export default router;