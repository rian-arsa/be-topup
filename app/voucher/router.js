const express = require('express');
const { index, create, store, edit, update, destroy } = require('./controller');
const multer = require('multer');
const os = require('os');

const router = express.Router();

router.get('/voucher', index);
router.get('/voucher/create', create);
router.post(
    '/voucher/create',
    multer({ dest: os.tmpdir() }).single('thumbnail'),
    store,
);
router.get('/voucher/:id/edit', edit);
router.put(
    '/voucher/:id',
    multer({ dest: os.tmpdir() }).single('thumbnail'),
    update,
);
router.delete('/voucher/:id', destroy);

module.exports = router;
