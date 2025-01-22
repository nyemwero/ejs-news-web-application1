import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import your authentication middleware

const router = express.Router();

// Protect the /admin route with authentication middleware
router.get('/', authenticateJWT, (req, res) => {
  res.render('admin-dashboard'); // Render the admin page if the user is authenticated
});

export default router;

