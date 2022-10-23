const Bank = require('./model');

const index = async (req, res) => {
    try {
        const banks = await Bank.find();
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };

        res.render('admin/bank/view_bank.ejs', {
            banks,
            alert,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
    }
};

const create = async (req, res) => {
    try {
        const banks = ['BNI', 'BRI', 'BCA', 'Mandiri'];
        res.render('admin/bank/create.ejs', {
            banks,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
    }
};

const store = async (req, res) => {
    try {
        const { name, bankName, noRekening } = req.body;
        const bank = await Bank.create({
            name,
            bankName,
            noRekening,
        });
        await bank.save();
        req.flash('alertMessage', 'Success add bank');
        req.flash('alertStatus', 'success');
        res.redirect('/bank');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const bank = await Bank.findOne({ _id: id });
        const banks = ['BNI', 'BRI', 'BCA', 'Mandiri'];
        res.render('admin/bank/edit.ejs', {
            bank,
            banks,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, bankName, noRekening } = req.body;
        await Bank.findOneAndUpdate(
            { _id: id },
            { name, bankName, noRekening },
        );
        req.flash('alertMessage', 'Success update bank');
        req.flash('alertStatus', 'success');
        res.redirect('/bank');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await Bank.findOneAndDelete({ _id: id });
        req.flash('alertMessage', 'Success delete bank');
        req.flash('alertStatus', 'success');
        res.redirect('/bank');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/bank');
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
