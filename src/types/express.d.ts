// src/types/express.d.ts
import * as express from 'express';
import { Article } from '../models/articleModel';  // Adjust the import based on your Article type

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can define the 'user' type more specifically if needed (e.g., User type)
    }
  }
}



declare global {
  namespace Express {
    interface Request {
      articles: Article[];  // Define the type of articles as an array of Article objects
    }
  }
}

