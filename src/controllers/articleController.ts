// src/controllers/articleController.ts
import { Request, Response } from 'express';
import * as ArticleModel from '../models/articleModel';

export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await ArticleModel.fetchAllArticles();
    res.render('home', { articles });
  } catch (error) {
    res.status(500).send('Error fetching articles');
  }
};
export const AdmingetAllArticles = async (req: Request, res: Response): Promise<void> => {
    try {
      const articles = await ArticleModel.fetchAllArticles();
      res.render('admin', { articles, tinymceApiKey: process.env.TINYMCE_API_KEY  },);
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
      res.redirect('/admin',); // Redirect to the admin dashboard after creating the article
    } catch (error) {
      res.status(500).send('Error creating article');
    }
  };
  

  export const updateArticleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const image = req.file ? req.file.path : null;
  
    try {
      // Step 1: Fetch the existing article to compare changes
      const existingArticle = await ArticleModel.fetchArticleById(Number(id));
      console.log(existingArticle);
      console.log(req.body);
  
      if (!existingArticle) {
        res.status(404).send('Article not found');
        return;
      }
      
      // Step 2: Update each field individually if it has changed
      const updatedData = existingArticle;

      // Check and update title if changed
      if (title && title !== existingArticle.title) {
        updatedData.title = title;
      }
  
      // Check and update content if changed
      if (content && content !== existingArticle.content) {
        updatedData.content = content;
      }
  
      // Check and update tags if changed
      if (tags && tags !== existingArticle.tags) {
        console.log(tags);
        const normalizedTags = tags 
            ? (Array.isArray(tags) 
                ? tags 
                : typeof tags === 'string' 
                    ? tags.split(',').map(tag => tag.trim()) 
                    : [])
            : [];;
        
        updatedData.tags = normalizedTags;
    }
  
      // Check and update image if changed
      if (image && image !== existingArticle.image) {
        updatedData.image = image;
      }
  
      // Step 3: Update the article if there are any changes
      if (Object.keys(updatedData).length > 0) {
        console.log(updatedData)
        await ArticleModel.updateArticle(Number(id), updatedData.title, updatedData.content, updatedData.image, updatedData.tags);
        res.redirect('/admin'); // Redirect to the admin dashboard after updating the article
      } else {
        res.redirect('/admin'); // No changes detected, just redirect
      }
    } catch (error) {
      console.error('Error updating article:', error);
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
