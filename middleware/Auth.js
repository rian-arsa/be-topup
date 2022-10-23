const User = require('../app/user/model');

const verifyUser = async (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
        req.flash('alertMessage', 'Anda harus login terlebih dahulu');
        req.flash('alertStatus', 'danger');
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = {
    verifyUser,
};
