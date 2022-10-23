const Player = require('../player/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    signup: async (req, res, next) => {
        try {
            const payload = req.body;

            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt =
                    req.file.originalname.split('.')[
                        req.file.originalname.split('.').length - 1
                    ];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(
                    config.rootPath,
                    `public/uploads/${filename}`,
                );

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on('end', async () => {
                    try {
                        const player = new Player({
                            ...payload,
                            avatar: filename,
                        });

                        await player.save();

                        delete player._doc.password;

                        res.status(200).json({
                            data: player,
                        });
                    } catch (error) {
                        if (error && error.name == 'ValidationError') {
                            return res.status(422).json({
                                message: error.message,
                                fields: error.errors,
                            });
                        }
                        next(err);
                    }
                });
            } else {
                let player = new Player(payload);
                await player.save();

                delete player._doc.password;

                res.status(200).json({
                    data: player,
                });
            }
        } catch (error) {
            if (error && error.name == 'ValidationError') {
                return res.status(422).json({
                    message: error.message,
                    fields: error.errors,
                });
            }
            next(err);
        }
    },
    signin: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await Player.findOne({ email: email });

            // check user
            if (user) {
                if (user.status == 'Y') {
                    const checkPassword = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if (checkPassword) {
                        const token = jwt.sign(
                            {
                                player: {
                                    id: user._id,
                                    email: user.email,
                                    usernam: user.usernam,
                                    status: user.status,
                                    nama: user.nama,
                                    phoneNumber: user.phoneNumber,
                                    avatar: user.avatar,
                                },
                            },
                            config.jwtKey,
                        );

                        return res.status(200).json({
                            code: '200',
                            status: 'OK',
                            data: { token },
                        });
                    } else {
                        return res.status(403).json({
                            message: 'Kata sandi anda salah',
                        });
                    }
                } else {
                    return res.status(403).json({
                        message: 'email yang akun anda belum aktif',
                    });
                }
            } else {
                return res.status(403).json({
                    message: 'email yang anda masukkan belum terdaftar',
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                fields: error.errors,
            });
        }
    },
};
