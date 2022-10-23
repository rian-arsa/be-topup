const express = require('express');
const { index, create, store, edit, update, destroy } = require('./controller');

const router = express.Router();

const { verifyUser } = require('../../middleware/Auth');

router.use(verifyUser);
router.get('/nominal', index);
router.get('/nominal/create', create);
router.post('/nominal/create', store);
router.get('/nominal/:id/edit', edit);
router.put('/nominal/:id', update);
router.delete('/nominal/:id', destroy);

module.exports = router;
