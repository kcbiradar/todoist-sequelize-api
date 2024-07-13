const express = require('express');

const router = express.Router();

const controllers = require('../controllers/user.controller');

router.post('/signup' , controllers.signup);
router.post('/login' , controllers.login);
router.delete('/delete/:id' , controllers.remove)

module.exports = router;