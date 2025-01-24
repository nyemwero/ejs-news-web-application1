// src/app.ts
import  * as d from './types/express'
import express from 'express';
import { Request, Response } from 'express';
import path from 'path';

// Import Routes
import homeRoutes from './routes/home';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import articleRoutes from './routes/article';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts'; // Import the layouts package'
import { addAuthToLocals } from './middlewares/authMiddleware';
import * as ArticleModel from './models/articleModel';




// Create an Express app
const app = express();
const methodOverride = require('method-override');

// Use method-override to handle _method query parameter
app.use(methodOverride('_method'));
app.use(addAuthToLocals);

// Configure layouts
// app.use(expressLayouts); // Use express-ejs-layouts
// app.set('layout', 'layouts/main'); // Default layout file
// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// Setup session middleware
app.use(
  session({
    secret: 'secretKey', // Change this to a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Use routes
app.use('/home', homeRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/article', articleRoutes);
app.use('/public', express.static('public'));


// Define a basic route
app.get('/',  homeRoutes);
app.get('/article/:id', async (req, res) => {
  const article = await ArticleModel.fetchArticleById(parseInt(req.params.id));
  res.render('articleDetail', { article });
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
