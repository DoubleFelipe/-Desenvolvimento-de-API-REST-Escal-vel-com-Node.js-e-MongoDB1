const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');
const event = require('../controllers/eventController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', auth.register);
router.post('/login', auth.login);

router.post('/events', authMiddleware, event.create);
router.get('/events', event.getAll);
router.put('/events/:id', authMiddleware, event.update);
router.delete('/events/:id', authMiddleware, event.delete);

module.exports = router;