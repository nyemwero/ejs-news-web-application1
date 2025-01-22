import { Router } from 'express';
import { login, logout , validateLogin } from '../controllers/userController';

const router = Router();
// Route to render the login page using EJS
router.get('/', (req, res) => {
    res.render('login'); // Assuming you have a 'login.ejs' view
});

// Add validation middleware and login handler
router.post('/login', validateLogin, login);
// Handle logout
router.get('/logout', logout); // Logout route
export default router;
