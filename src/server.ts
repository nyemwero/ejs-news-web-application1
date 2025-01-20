// src/app.ts
import express, { Request, Response } from 'express';
import path from 'path';

// Import Routes
import homeRoutes from './routes/home';
import authRoutes from './routes/auth';
import articlesRoutes from './routes/articles';
import adminRoutes from './routes/admin';

// Create an Express app
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/homes', homeRoutes);
app.use('/auth', authRoutes);
app.use('/articles', articlesRoutes);
app.use('/admin', adminRoutes);

// Define a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from TypeScript!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
