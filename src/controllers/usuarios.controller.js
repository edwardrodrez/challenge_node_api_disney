import Models from '../models/AllModels'
import helpers from './helpers';
import token from '../services/token';


//Login de usuarios
let login = async (req, res, next) => {
    const { Email, Password } = req.body;
    try {
        let user = await Models.Usuario.findOne({ email: Email });
        if (user) {
            let match = await helpers.matchPassword(Password, user.password);
            if (match) {
                let TokenReturn = await token.encode(user.usuarioid)
                req.session.user = user;
                res.status(200).json({
                    message: "Usuario logeado",
                    data: user,
                    token: TokenReturn
                }
                );
            } else {
                res.status(404).send({
                    message: "Contraseña incorrecta"
                });
            }
        } else {
            res.status(404).send({
                message: "Usuario incorrecto"
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}



//Registro de Usuarios
let register = async (req, res, next) => {
    const { usuarioid, rol, nombre, email, tipo_documento, nro_documento, Password } = req.body;
    const password = await helpers.encryptPassword(Password);
    try {
        const data = await Models.Usuario.create({
            usuarioid,
            rol,
            nombre,
            email,
            tipo_documento,
            nro_documento,
            password
        })
        if (data) {
            res.status(200).json({
                message: "Usuario ah sido registrado",
                data: data
            })
        } else {
            res.status(404).send({
                message: "El usuario no ah podido ser registrado"
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}

//Cierre de Session
let logout = (req, res, next) => {
    try {
        if (req.session.destroy()) {
            console.log(req.session)
            res.status(200).send({
                message: "Session cerrada"
            });
        } else {
            res.status(404).send({
                message: "Vuelva a intentarlo"
            });
        }

    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}


export default {
    login,
    register,
    logout
}