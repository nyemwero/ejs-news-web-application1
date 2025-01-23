// src/controllers/articleController.ts
import { Request, Response } from 'express';
import * as ArticleModel from '../models/articleModel';

export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await ArticleModel.fetchAllArticles();
    res.render('admin-dashboard', { articles });
  } catch (error) {
    res.status(500).send('Error fetching articles');
  }
};

// src/controllers/articleController.ts
export const createNewArticle = async (req: Request, res: Response): Promise<void> => {
    const { title, content, tags } = req.body;
    const image = req.file ? req.file.path : null;
    console.log(image);
    // Ensure that tags is always an array, even if empty
    const normalizedTags = tags 
    ? (Array.isArray(tags) 
        ? tags 
        : typeof tags === 'string' 
            ? tags.split(',').map(tag => tag.trim()) 
            : [])
    : [];
    console.log('Request Body:', req.body); // Log the request body
    try {
      const newArticle = await ArticleModel.createArticle(title, content, image, normalizedTags);
      res.redirect('/admin'); // Redirect to the admin dashboard after creating the article
    } catch (error) {
      res.status(500).send('Error creating article');
    }
  };
  

export const updateArticleById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updatedArticle = await ArticleModel.updateArticle(Number(id), title, content, image, tags);
    res.redirect('/admin'); // Redirect to the admin dashboard after updating the article
  } catch (error) {
    res.status(500).send('Error updating article');
  }
};

export const deleteArticleById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await ArticleModel.deleteArticle(Number(id));
    res.redirect('/admin'); // Redirect to the admin dashboard after deleting the article
  } catch (error) {
    res.status(500).send('Error deleting article');
  }
};
