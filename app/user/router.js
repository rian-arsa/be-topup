const express = require('express');
const { createLogin, storeLogin, logout } = require('./controller');

const router = express.Router();

router.get('/', createLogin);
router.post('/', storeLogin);
router.get('/logout', logout);

module.exports = router;
