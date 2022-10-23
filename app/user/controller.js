const User = require('./model');
const bcrypt = require('bcryptjs');

const createLogin = async (req, res) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };

        if (req.session.user === null || req.session.user === undefined) {
            res.render('admin/users/signin.ejs', {
                alert,
            });
        } else {
            res.redirect('/dashboard');
        }
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
    }
};

const storeLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // check user
        if (user) {
            if (user.status == 'Y') {
                const checkPassword = await bcrypt.compare(
                    password,
                    user.password,
                );
                if (checkPassword) {
                    req.session.user = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                    res.redirect('/dashboard');
                } else {
                    req.flash('alertMessage', `Kata sandi salah`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/');
                }
            } else {
                req.flash('alertMessage', `Mohon maaf status anda belum aktif`);
                req.flash('alertStatus', 'danger');
                res.redirect('/');
            }
        } else {
            req.flash('alertMessage', `Email yang dimasukkan salah`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
        }
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
    }
};

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = {
    createLogin,
    storeLogin,
    logout,
};
