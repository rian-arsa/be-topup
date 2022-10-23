const Payment = require('./model');
const Bank = require('../bank/model');

const index = async (req, res) => {
    try {
        const payments = await Payment.find().populate('banks');
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };

        res.render('admin/payment/view_payment.ejs', {
            payments,
            alert,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
    }
};

const create = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.render('admin/payment/create.ejs', {
            banks,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
    }
};

const store = async (req, res) => {
    try {
        const { type, banks } = req.body;
        const store = await Payment.create({
            type,
            banks,
        });
        await store.save();
        req.flash('alertMessage', 'Success add payment');
        req.flash('alertStatus', 'success');
        res.redirect('/payment');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findOne({ _id: id }).populate('banks');
        const banks = await Bank.find();
        res.render('admin/payment/edit.ejs', {
            payment,
            banks,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, banks, status } = req.body;
        const payment = await Payment.findOneAndUpdate(
            { _id: id },
            { type, banks, status },
        );
        req.flash('alertMessage', 'Success update payment');
        req.flash('alertStatus', 'success');
        res.redirect('/payment');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findOneAndDelete({ _id: id });
        req.flash('alertMessage', 'Success delete payment');
        req.flash('alertStatus', 'success');
        res.redirect('/payment');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/payment');
    }
};

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy,
};
