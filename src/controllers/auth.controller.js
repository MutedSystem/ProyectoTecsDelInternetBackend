import database from '../database';
import config from '../config';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const singup = (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.phone || !req.body.direction || !req.body.role) {
            return res.status(400).json({

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

            const query = "SELECT COUNT(`correo`) AS numberOfUsers FROM usuario WHERE `correo` LIKE '" + email + "';";

            database.query(query, (getEmailCountError, getEmailCountResult) => {
                if (getEmailCountError) {
                    return res.status(500).json({
                        message: 'bad request'
                    });
                } else {
                    if (getEmailCountResult[0].numbreOfUsers >= 1) {
                        return res.status(419).json({
                            message: 'user already exists'
                        });
                    } else {
                        const uuid = crypto.randomUUID();
                        const query = "INSERT INTO `usuario` (`idUsuario`, `telefono`, `correo`, `contrasena`, `nombre`, `direccion`, `rango`) VALUES (?)";

                        const values = [
                            [
                                uuid,
                                phone,
                                email,
                                bcrypt.hashSync(password, 10),
                                name,
                                direction,
                                role
                            ]
                        ];

                        database.query(query, values, async (registerError, registerResults) => {
                            if (registerError) {
                                return res.status(500).json({
                                    message: 'bad query'
                                });
                            } else {
                                return res.json({
                                    message: 'user correctly registered'
                                });
                            }
                        });

                    }
                }
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

            const query = "SELECT * FROM `usuario` WHERE `correo`='" + email + "';";

            database.query(query, (getUserInfoError, getInfoUserResult) => {
                if (getUserInfoError) {
                    return res.status(500).json({
                        message: 'bad request 1'
                    });
                } else {
                    if (getInfoUserResult.length >= 1) {
                        bcrypt.compare(password, getInfoUserResult[0].contrasena, (comparePasswordError, isSamePassword) => {
                            if (comparePasswordError) {
                                return res.status(401).json({
                                    message:'wrong password'
                                });
                            } else {
                                if (isSamePassword) {
                                    const token = jwt.sign({
                                        id: getInfoUserResult[0].idUsuario
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
                    } else {
                        return res.status(404).json({
                            message: 'user not found'
                        });
                    }
                }
            });

        } else {
            return res.status(400).json({
                message: 'inclompconste data'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message : "internal server error"
        });
    }
}