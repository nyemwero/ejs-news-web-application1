// src/models/articleModel.ts
import pool from '../db';

// Fetch all articles from the database
export const fetchAllArticles = async () => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    return result.rows;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Insert a new article into the database
export const createArticle = async (title: string, content: string, image: string, tags: string[]) => {
  try {
    const query = 'INSERT INTO articles(title, content, image, tags) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [title, content, image, tags.join(',')];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};



