const express = require('express');
const { index, create, store, update, edit, destroy } = require('./controller');

const router = express.Router();

const { verifyUser } = require('../../middleware/Auth');

router.use(verifyUser);
router.get('/payment', index);
router.get('/payment/create', create);
router.post('/payment/create', store);
router.get('/payment/:id/edit', edit);
router.put('/payment/:id', update);
router.delete('/payment/:id', destroy);

module.exports = router;
