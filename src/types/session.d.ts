// src/types/session.d.ts
import { User } from '../models/userModel'; // Adjust the import based on your User model

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      username: string;
    };
  }
}
 