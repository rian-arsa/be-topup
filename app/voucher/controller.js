const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

const index = async (req, res) => {
    try {
        const vouchers = await Voucher.find()
            .populate('category')
            .populate('nominals')
            .populate('user');

        const alertMessage = req.flash('flashMessage');
        const alertStatus = req.flash('flashStatus');
        const alert = { message: alertMessage, status: alertStatus };
        res.render('admin/voucher/view_voucher.ejs', { vouchers, alert });
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/voucher');
    }
};

const create = async (req, res) => {
    try {
        const categories = await Category.find();
        const nominals = await Nominal.find();
        res.render('admin/voucher/create.ejs', {
            categories,
            nominals,
        });
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/voucher');
    }
};

const store = async (req, res) => {
    try {
        const { name, category, nominals } = req.body;

        if (req.file) {
            let tmp = req.file.path;
            let ext =
                req.file.originalname.split('.')[
                    req.file.originalname.split('.').length - 1
                ];
            let filename = req.file.filename + '.' + ext;
            console.log(req.file);
            let target = path.resolve(
                config.rootPath,
                `public/uploads/${filename}`,
            );

            const src = fs.createReadStream(tmp);
            const dest = fs.createWriteStream(target);

            src.pipe(dest);

            src.on('end', async () => {
                const voucher = await Voucher.create({
                    name,
                    thumbnail: filename,
                    category,
                    nominals,
                    // user: req.session.user._id,
                });

                await voucher.save();

                req.flash('flashMessage', 'Success add voucher');
                req.flash('flashStatus', 'success');
                res.redirect('/voucher');
            });
        } else {
            const voucher = await Voucher.create({
                name,
                category,
                nominals,
                // user: req.session.user._id,
            });

            await voucher.save();

            req.flash('flashMessage', 'Success add voucher');
            req.flash('flashStatus', 'success');
            res.redirect('/voucher');
        }
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/voucher');
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const voucher = await Voucher.findOne({ _id: id })
            .populate('category')
            .populate('nominals');
        const categories = await Category.find();
        const nominals = await Nominal.find();

        res.render('admin/voucher/edit', { voucher, categories, nominals });
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/voucher');
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, nominals, status } = req.body;

        if (req.file) {
            let tmp = req.file.path;
            let ext =
                req.file.originalname.split('.')[
                    req.file.originalname.split('.').length - 1
                ];
            let filename = req.file.filename + '.' + ext;
            console.log(req.file);
            let target = path.resolve(
                config.rootPath,
                `public/uploads/${filename}`,
            );

            const src = fs.createReadStream(tmp);
            const dest = fs.createWriteStream(target);

            src.pipe(dest);

            src.on('end', async () => {
                try {
                    const vouchers = await Voucher.findOne({ _id: id });
                    let currentImage = `${config.rootPath}/public/uploads/${vouchers.thumbnail}`;

                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage);
                    }

                    const voucher = await Voucher.findOneAndUpdate(
                        {
                            _id: id,
                        },
                        {
                            name,
                            thumbnail: filename,
                            category,
                            nominals,
                            // user: req.session.user._id,
                        },
                    );

                    await voucher.save();

                    req.flash('flashMessage', 'Success update voucher');
                    req.flash('flashStatus', 'success');
                    res.redirect('/voucher');
                } catch (error) {
                    req.flash('flashMessage', `${error.message}`);
                    req.flash('flashStatus', 'danger');
                    res.redirect('/voucher');
                }
            });
        } else {
            const voucher = await Voucher.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    name,
                    category,
                    nominals,
                    status,
                    // user: req.session.user._id,
                },
            );

            await voucher.save();

            req.flash('flashMessage', 'Success update voucher');
            req.flash('flashStatus', 'success');
            res.redirect('/voucher');
        }
    } catch (error) {}
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const vouchers = await Voucher.findOne({ _id: id });
        let currentImage = `${config.rootPath}/public/uploads/${vouchers.thumbnail}`;

        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        }

        await Voucher.findOneAndRemove({ _id: id });
        req.flash('flashMessage', 'Success delete voucher');
        req.flash('flashStatus', 'success');
        res.redirect('/voucher');
    } catch (error) {
        req.flash('flashMessage', `${error.message}`);
        req.flash('flashStatus', 'danger');
        res.redirect('/voucher');
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
