const config = require('../config');
const Player = require('../app/player/model');
const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
        req.flash('alertMessage', 'Anda harus login terlebih dahulu');
        req.flash('alertStatus', 'danger');
        res.redirect('/');
    } else {
        next();
    }
};

const isLoginPlayer = async (req, res, next) => {
    try {
        const token = req.headers.authorization
            ? req.headers.authorization.replace('Bearer ', '')
            : null;

        console.log(token);
        const data = jwt.verify(token, config.jwtKey);

        console.log('>>>>>>>>>', data);
        const player = await Player.findOne({ _id: data.player.id });

        if (!player) {
            throw new Error();
        }

        (req.player = player), (req.token = token);
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Not authorized to access this resource',
            message: error.message,
        });
    }
};

module.exports = {
    verifyUser,
    isLoginPlayer,
};
