import Models from '../database/models/models'
import bcrypt from '../helpers/bcrypt';
import secretKey from '../helpers/randomkey'
import jwt from 'jsonwebtoken';
import authConfig from '../settings/auth';
import Op from 'Sequelize';


//Login de usuarios
let login = async (req, res, next) => {
    const { Email, Password } = req.body;
    try {
        //Busqueda del usuario por email
        const user = await Models.Usuario.findOne({where:{ email: Email }});
        if (user) {
            //Comparamos passwords
            let match = await bcrypt.matchPassword(Password, user.password);
            if (match) {
                //Generamos un token 
                let TokenReturn = jwt.sign({ user: user }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                res.status(200).json({
                    auth: true,
                    user: user.nombre,
                    token: TokenReturn
                })
            } else {
                res.status(404).send({
                    message: "Contraseña ingresada es incorrecta"
                })
            }
        } else {
            res.status(404).send({
                message: "No posees una cuenta con ese email"
            })
        }
    } catch (e) {
        res.status(500).send({
            error: true,
            message: "Error en el proceso: " + e
        })
        next(e)
    }
}




//Registro de Usuarios
let register = async (req, res, next) => {
    const { rol, nombre, email, tipo_documento, nro_documento, Password } = req.body;
    const password = await bcrypt.encryptPassword(Password);
    try {
        const user = await Models.Usuario.findOne({
            where: { [Op.or]: [{ email: email }, { nro_documento: nro_documento }] }
        });
        //Verificamos que no tenga una cuenta ya creada con el email o nro del documento
        if (user) {
            if (String((user.email.toLowerCase())) == String((email.toLowerCase()))) {
                res.status(404).json({
                    message: "Ya te encuentras registrado con el email"
                });
            } else {
                res.status(404).json({
                    message: "Ya te encuentras registrado con el Nro de documento"
                });
            }
        } else {
            //Creamos el usuario
            const data = await Models.Usuario.create({
                rol,
                nombre,
                email,
                tipo_documento,
                nro_documento,
                password,
                estado: 1,
            }).catch(err => {
                res.status(404).json({
                    error: true,
                    message: err.message
                })
            });
            //Generamos un token 
            let TokenReturn = jwt.sign({ user: data }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            res.status(200).json({
                auth: true,
                user: data.nombre,
                token: TokenReturn
            });
        }
    } catch (e) {
        res.status(500).send({
            error: true,
            message: "Ah ocurrido un error en el proceso: " + e
        })
        next(e)
    }
}

//Cierre de Session (Eliminar)
let logout = async (req, res, next) => {
    try {
        let key = await secretKey.randomkey();     
        // Le devolvemos un token random, que no esta registado  
        req.token = req.token + key;
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