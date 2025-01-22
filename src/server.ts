// src/app.ts
import  * as d from './types/express'
import express from 'express';
import { Request, Response } from 'express';
import path from 'path';

// Import Routes
import homeRoutes from './routes/home';
import authRoutes from './routes/auth';

import articlesRoutes from './routes/articles';
import adminRoutes from './routes/admin';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';











// Create an Express app
const app = express();

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


// Define a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from TypeScript!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
