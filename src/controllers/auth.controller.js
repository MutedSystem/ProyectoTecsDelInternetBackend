import config from '../config';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as authDaos from '../DAO/auth.dao';

export const singup = (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.phone || !req.body.direction || !req.body.role) {
            return res.status(400).json({
                message: 'incomplete data'
            });
        } else {
            const {
                email,
                password,
                name,
                phone,
                direction,
                role
            } = req.body;

            authDaos.verifyUserRegistered(email)
                .then((userCountResult) => {
                    if (userCountResult.countUser > 0) {
                        return res.status(419).json({
                            message: 'user already exists'
                        });
                    } else {
                        const values = [
                            [
                                crypto.randomUUID(),
                                phone,
                                email,
                                bcrypt.hashSync(password, 10),
                                name,
                                direction,
                                role
                            ]
                        ];
                        authDaos.registerUser(values)
                            .then(() => {
                                return res.json({
                                    message: 'user correctly registered'
                                });
                            })
                            .catch((error) => {
                                return res.status(error.code)
                            });
                    }
                })
                .catch((emailRegisteredError) => {
                    return res.status(500).json({
                        message: emailRegisteredError.message
                    });
                });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error'
        });
    }
}

export const singin = (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            const {
                email,
                password
            } = req.body;

            authDaos.singinUserInfo(email)
                .then((userInfo) => {
                    bcrypt.compare(password, userInfo.password, (comparePasswordError, isSamePassword) => {
                        if (comparePasswordError) {
                            return res.status(401).json({
                                message: 'wrong password'
                            });
                        } else {
                            if (isSamePassword) {
                                const token = jwt.sign({
                                    id: userInfo.id
                                }, config.SECRET);
                                return res.json({
                                    token
                                });
                            } else {
                                return res.status(401).json({
                                    message: "wrong password"
                                });
                            }
                        }
                    });
                })
                .catch((error) => {
                    return res.status(error.code).json({
                        message: error.message
                    });
                });
        } else {
            return res.status(400).json({
                message: 'inclompconste data'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
}