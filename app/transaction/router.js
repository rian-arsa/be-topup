const express = require('express');
const router = express.Router();
const { index, update } = require('./controller');

const { verifyUser } = require('../../middleware/auth');

router.use(verifyUser);
/* GET home page. */
router.get('/transaction', index);
router.put('/transaction/:id', update);

module.exports = router;
