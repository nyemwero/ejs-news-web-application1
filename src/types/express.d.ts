// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can define the 'user' type more specifically if needed (e.g., User type)
    }
  }
}
