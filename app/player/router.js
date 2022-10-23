const express = require('express');
const router = express.Router();
const {
    landingPage,
    detailPage,
    category,
    checkout,
    history,
    historyDetail,
    dashboard,
    profile,
    editProfile,
} = require('./controller');
const { isLoginPlayer } = require('../../middleware/Auth');
const multer = require('multer');
const os = require('os');

// const { isLoginAdmin } = require("../../middleware/auth");

// router.use(isLoginAdmin);
/* GET home page. */
router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);
router.get('/profile', isLoginPlayer, profile);
router.put(
    '/profile',
    isLoginPlayer,
    multer({ dest: os.tmpdir() }).single('avatar'),
    editProfile,
);

module.exports = router;
