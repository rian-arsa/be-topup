const Nominal = require('./model');

const index = async (req, res) => {
    try {
        const nominals = await Nominal.find();

        const alertMessage = req.flash('flashMessage');
        const alertStatus = req.flash('flashStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.render('admin/nominal/view_nominal.ejs', { nominals, alert });
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/nominal');
    }
};

const create = async (req, res) => {
    try {
        res.render('admin/nominal/create.ejs');
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/nominal');
    }
};

const store = async (req, res) => {
    try {
        const { coinQuantity, coinName, price } = req.body;
        await Nominal.create({ coinQuantity, coinName, price });

        req.flash('flashMessage', 'Success add nominal');
        req.flash('flashStatus', 'success');
        res.redirect('/nominal');
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/nominal');
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const nominal = await Nominal.findOne({ _id: id });
        res.render('admin/nominal/edit.ejs', { nominal });
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/nominal');
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { coinQuantity, coinName, price } = req.body;
        await Nominal.findOneAndUpdate(
            {
                _id: id,
            },
            {
                coinQuantity,
                coinName,
                price,
            },
        );
        req.flash('flashMessage', 'Success update nominal');
        req.flash('flashStatus', 'success');
        res.redirect('/nominal');
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/nominal');
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await Nominal.findOneAndDelete({ _id: id });
        req.flash('flashMessage', 'Success delete nominal');
        req.flash('flashStatus', 'success');
        res.redirect('/nominal');
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/nominal');
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
