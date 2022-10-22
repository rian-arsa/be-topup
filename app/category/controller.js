const Category = require('./model');

const index = async (req, res) => {
    try {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus };
        const categories = await Category.find();
        res.render('admin/category/view_category', {
            categories,
            alert,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/category');
    }
};

const create = async (req, res) => {
    try {
        res.render('admin/category/create');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/category');
    }
};

const store = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();

        req.flash('alertMessage', `Berhasil Menambah Category`);
        req.flash('alertStatus', 'success');
        res.redirect('/category');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/category');
    }
};

const edit = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.render('admin/category/edit', {
            category,
        });
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/category');
    }
};

const update = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.findByIdAndUpdate(req.params.id, { name });

        req.flash('alertMessage', `Berhasil Mengubah Category`);
        req.flash('alertStatus', 'success');
        res.redirect('/category');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/category');
    }
};

const destroy = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        req.flash('alertMessage', `Berhasil Menghapus Category`);
        req.flash('alertStatus', 'success');
        res.redirect('/category');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/category');
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
