// src/controllers/articleController.ts
import { Request, Response } from 'express';
import pool from '../db';  // Assuming db.ts sets up and exports the PostgreSQL pool

export const getArticles = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    console.log(result.rows);
    res.render('articles', { articles: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching articles');
  }
};
