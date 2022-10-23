var express = require('express');
const { index } = require('./controller');
var router = express.Router();

const { verifyUser } = require('../../middleware/Auth');

router.use(verifyUser);
router.get('/dashboard', index);

module.exports = router;
