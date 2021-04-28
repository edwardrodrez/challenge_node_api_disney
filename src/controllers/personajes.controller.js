import Models from '../models/AllModels';


//Crear Personaje
let add = async (req, res, next) => {
    const { personajeid, nombre, edad, imagen, peso, historia } = req.body;
    try {
        const data = await Models.Personaje.create({
            personajeid,
            nombre,
            edad,
            imagen,
            peso,
            historia,
        }, {
            field: ['nombre', 'edad', 'imagen', 'peso', 'historia']
        });
        if (data) {
            res.status(200).json({
                message: "Personaje creado correctamente",
                data: data
            });
        } else {
            res.status(404).send({
                message: "El personaje no ah podido ser creado",
            });
        }

    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}

//Detalle de Personaje
let query = async (req, res, next) => {
    let id = req.query.personajeid;
    try {
        const data = await Models.Personaje.findOne({
            where: {
                personajeid: id
            }
        });
        if (!data) {
            res.status(404).send({
                message: "El personaje que esta buscando no existe"
            });
        } else {
            res.status(200).json({
                message: "Detalle de Personaje",
                data: data
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}

//Listar Personajes
let list = async (req, res, next) => {
    try {
        const data = await Models.Personaje.findAll({
            attributes: ["nombre", "imagen"],
            where: {
                estado: true
            }
        });
        if (data.length == 0) {
            res.status(404).send({
                message: "No hay personajes creados",
            });
        } else {
            res.status(200).json({
                message: "Todos los Personajes",
                data: data
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}

//Actualizar Personaje
let update = async (req, res, next) => {
    let id = req.body.personajeid;
    const { nombre, edad, imagen, peso, historia } = req.body;
    try {
        const data = await Models.Personaje.
            update(
                {
                    nombre: nombre, edad: edad, imagen: imagen, peso: peso, historia: historia
                }, {
                where: {
                    personajeid: id
                }
            });
        if (data == 0) {
            res.status(404).send({
                message: "Personaje no existe",
            });
        } else {
            res.status(200).json({
                message: "Personaje actualizado correctamente",
                data: data
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso siguiente: " + e
        });
        next(e)
    }
}

//Eliminar Personaje
let remove = async (req, res, next) => {
    let id = req.body.personajeid;
    try {
        const data = await Models.Personaje.destroy({
            where: {
                personajeid: id
            }
        });
        if (data == 1) {
            res.status(200).json({
                message: "Personaje eliminado correctamente",
            });
        } else {
            res.status(404).send({
                message: "Personaje no existe",
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}





let activate = (req, res, next) => {
    try {

        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        });
        next(e)
    }
}

let desactivate = (req, res, next) => {
    try {

        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        });
        next(e)
    }
}

export default {
    add,
    query,
    list,
    update,
    activate,
    desactivate,
    remove
}