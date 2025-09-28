const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes
router.get('/verify', authenticateToken, authController.verifyToken);
router.post('/change-password', authenticateToken, authController.changePassword);

module.exports = router;
