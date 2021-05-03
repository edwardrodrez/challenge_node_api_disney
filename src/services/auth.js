import jwt from 'jsonwebtoken';
import authConfig from '../settings/auth';

// Authorizacion por token
export let auth = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    //Verifica si es que recibe un token y con verify si este es correcto
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        jwt.verify(req.token, authConfig.secret, (error, next) =>{
            if(error){
                res.status(403).send({
                    message: "No tienes permisos para acceder a la ruta"
                })
            }else {
               return req.token
            }
        })
        next()
    } else {
        res.status(403).send({
            message: "No tienes permisos para acceder a la ruta"
        });
    }
};


