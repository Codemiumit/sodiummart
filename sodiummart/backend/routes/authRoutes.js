const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile, updateProfile, getAdminStats } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/admin/stats', protect, authorize('admin'), getAdminStats);

module.exports = router;
