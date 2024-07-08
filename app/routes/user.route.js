const express = require('express');

const router = express.Router();

const controllers = require('../controllers/user.controller');

router.post('/' , controllers.create);

module.exports = router;