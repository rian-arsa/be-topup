const express = require('express');
const { index, create, store, edit, update, destroy } = require('./controller');

const router = express.Router();

const { verifyUser } = require('../../middleware/Auth');

router.use(verifyUser);
router.get('/bank', index);
router.get('/bank/create', create);
router.post('/bank/create', store);
router.get('/bank/:id/edit', edit);
router.put('/bank/:id', update);
router.delete('/bank/:id', destroy);

module.exports = router;
