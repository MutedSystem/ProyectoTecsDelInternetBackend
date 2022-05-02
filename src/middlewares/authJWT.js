import config from "../config";
import database from "../database";
import jwt from 'jsonwebtoken';

export const verifyUserToken = (req, res, next) => {
    try {

        const token = req.headers["x-access-token"];

        if (!token){
            return res.status(403).json({ message: "No token provided" });
        }else{
            jwt.verify(token, config.SECRET, (tokerError, tokenDecoded) => {
                if (tokerError) return res.status(401).json({
                    message: 'invalid token'
                });
    
                const id = tokenDecoded.id;
    
                const query = "SELECT COUNT(`idUsuario`) AS numberOfUsers FROM usuario WHERE `idUsuario` LIKE '" + id + "'";
                database.query(query, (error, results) => {
                    if (error) return res.status(500).json({ message: 'Bad query' });
                    if (results[0].numberOfUsers > 0) {
                        req.body.id = id;
                        next();
                    } else {
                        return res.status(404).json({ message: "No user found" });
                    }
                });
    
            });
        }
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized!" });
    }
}
