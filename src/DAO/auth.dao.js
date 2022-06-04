import database from '../database';

export const verifyUserRegistered = (userEmail) => {

    return new Promise((resolve, reject) => {
        if (!userEmail) {
            reject({
                code: 400,
                message: "incomplete data"
            });
        } else {
            const query = "SELECT COUNT(`correo`) AS numberOfUsers FROM usuario WHERE `correo` LIKE ?";
            database.query(query, userEmail, (getCountUserError, countUser) => {
                if (getCountUserError) {
                    reject({
                        getCountUserError,
                        code: 500,
                        message: 'internal server error'
                    });
                } else {
                    resolve({
                        countUser: countUser[0].numberOfUsers
                    });
                }
            })

        }
    });

}

export const registerUser = (userInfo) => {
    return new Promise((resolve, reject) => {
        if (!userInfo) {
            reject({
                code: 400,
                message: "incomplete data"
            });
        } else {
            let query = "INSERT INTO `usuario` (`idUsuario`, `telefono`, `correo`, `contrasena`, `nombre`, `direccion`, `rango`) VALUES (?)";

            database.query(query, userInfo, (registerUserError, registerUserResults) => {
                if (registerUserError) {
                    reject({
                        code: 500,
                        message: 'internal server error'
                    });
                } else {
                    resolve({
                        message: 'user registred'
                    });
                }
            });
        }
    });
}

export const singinUserInfo = (userEmail) => {

    return new Promise((resolve, reject) => {
        if (!userEmail) {
            reject({
                code: 400,
                message: "incomplete data"
            });
        } else {

            const query = "SELECT idUsuario, contrasena, nombre FROM usuario WHERE correo LIKE ?";

            database.query(query, userEmail, (getUserInfoError, userInfo) => {
                if (getUserInfoError) {
                    reject({
                        code: 500,
                        message: 'internal server error'
                    });
                } else {
                    if (userInfo.length >= 1) {
                        resolve({
                            id : userInfo[0].idUsuario,
                            password : userInfo[0].contrasena,
                            name: userInfo[0].nombre
                        });
                    } else {
                        reject({
                            code: 404,
                            message: 'user not found'
                        });
                    }
                }
            });
        }
    });

}