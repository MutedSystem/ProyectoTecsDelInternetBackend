import database from '../database';
import config from '../config';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const singup = (req, res) => {
    try {
        if (req.body.email && req.body.password && req.body.name && req.body.phone && req.body.direction && req.body.role) {

            const {
                email,
                password,
                name,
                phone,
                direction,
                role
            } = req.body;

            let query = "SELECT COUNT(`correo`) AS numberOfUsers FROM usuario WHERE `correo` LIKE '" + email + "'";

            database.query(query, (getEmailCountError, getEmailCountResult) => {
                if (getEmailCountError) {
                    return res.status(500);
                } else {
                    if (getEmailCountResult[0].numbreOfUsers >= 1) {
                        return res.status(419).json({
                            message: 'user already exists'
                        });
                    } else {
                        let uuid = crypto.randomUUID();
                        let query = "INSERT INTO `usuario` (`idUsuario`, `telefono`, `correo`, `contrasena`, `nombre`, `direccion`, `rango`) VALUES (?)";

                        let values = [
                            [
                                uuid,
                                phone,
                                email,
                                bcrypt.hashSync(password, 10),
                                name,
                                phone,
                                direction,
                                role
                            ]
                        ];

                        database.query(query, values, async (registerError, registerResults)=> {
                            if(loginError){
                                return res.status(500);
                            }else{
                                return res.json({
                                    message: 'user correctly registered'
                                });
                            }
                        });

                    }
                }
            });

        } else {
            return res.status(400).json({
                message: 'incomplete data'
            });
        }
    } catch (error) {
        return res.status(500);
    }
}

export const singin = (req,res) => {
    try {
        if(req.body.email && req.body.password){
            let {
                email,
                password
            } = req.body;

            let query = "SELECT * FROM `usuario` WHERE `correo`='"+email+"';";

            database.query(query,(getUserInfoError,getInfoUserResult) => {
                if(getUserInfoError){
                    return res.status(500);
                }else{
                    if(getInfoUserResult.length >= 1){
                        bcrypt.compare(password, getInfoUserResult[0].contrasena,(comparePasswordError, isSamePassword) => {
                            if(comparePasswordError){
                                return res.status(401);
                            }else{
                                if(isSamePassword){
                                    let token = jwt.sign({
                                        id: getInfoUserResult[0].idUsuario
                                    },config.SECRET);
                                    return res.json({
                                        token
                                    });
                                }else{
                                    return res.status(401);
                                }
                            }
                        });
                    }else{
                        return res.status(404);
                    }
                }
            });

        }else{
            return res.status(400).json({
                message: 'inclomplete data'
            });
        }
    } catch (error) {
        return res.status(500);
    }
}