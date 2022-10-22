var express = require('express');
const { index, create, store, edit, update, destroy } = require('./controller');
var router = express.Router();

router.get('/category', index);
router.get('/category/create', create);
router.post('/category/create', store);
router.get('/category/:id/edit', edit);
router.put('/category/:id', update);
router.delete('/category/:id', destroy);

module.exports = router;
