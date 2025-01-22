// src/models/articleModel.ts
import pool from '../db'; // assuming you have a pool instance for your database connection

// Define the article interface
export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

// Fetch all articles from the database
export const fetchAllArticles = async (): Promise<Article[]> => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    return result.rows;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Fetch an article by ID
export const fetchArticleById = async (id: number): Promise<Article | null> => {
  try {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error fetching article by id:', error);
    throw error;
  }
};

// src/models/articleModel.ts
export const createArticle = async (
    title: string,
    content: string,
    image: string | null,
    tags: string[] = [] // Default to an empty array if tags are not provided
  ): Promise<Article> => {
    try {
      // Ensure that tags is always an array
      const query = 'INSERT INTO articles(title, content, image, tags) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [title, content, image, tags.length > 0 ? tags.join(',') : '']; // Handle empty tags
      const result = await pool.query(query, values);
      return result.rows[0]; // return the created article
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  };
  
// Update an article in the database
export const updateArticle = async (
  id: number,
  title: string,
  content: string,
  image: string | null,
  tags: string[]
): Promise<Article> => {
  try {
    const query = 'UPDATE articles SET title = $1, content = $2, image = $3, tags = $4 WHERE id = $5 RETURNING *';
    const values = [title, content, image, tags.join(','), id];
    const result = await pool.query(query, values);
    return result.rows[0]; // return the updated article
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Delete an article by ID
export const deleteArticle = async (id: number): Promise<void> => {
  try {
    await pool.query('DELETE FROM articles WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};
