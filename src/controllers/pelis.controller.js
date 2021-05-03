const { Op } = require("sequelize");
import models from "../database/models/models";
import Models from "../database/models/models";


//Crear Pelicula
let add = async (req, res, next) => {
    const { titulo, imagen, fecha_creacion, calificacion, genero } = req.body;
    try {
        const data = await Models.PeliculaSerie.create({
            titulo,
            imagen,
            fecha_creacion,
            calificacion,
            genero,
            tipo: 'p'
        }, {
            field: ['nombre', 'edad', 'peso', 'historia']
        });
        if (data) {
            res.status(200).json({
                message: "Pelicula creada correctamente",
                data: data
            });
        } else {
            res.status(404).send({
                message: "La pelicula no ah podido ser creada",
            });
        }

    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}

//Detalle de Pelicula
let query = async (req, res, next) => {
    let id = req.query.id;
    try {
        const data = await Models.PeliculaSerie.findOne({
            where: {
                id: id,
                tipo: 'p'
            },
            include: {
                model: Models.Personaje,
                attributes: ["nombre", "edad", "peso", "historia", "imagen",],
            }
        });
        if (!data) {
            res.status(404).send({
                message: "La pelicula que esta buscando no existe"
            });
        } else {
            res.status(200).json({
                message: "Detalle de Pelicula",
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

//Listar Peliculas
let list = async (req, res, next) => {
    try {
        const data = await Models.PeliculaSerie.findAll({
            attributes: ["titulo", "imagen", 'fecha_creacion'],
            where: {
                estado: true,
                tipo: 'p'
            }
        });
        if (!data) {
            res.status(404).send({
                message: "No hay peliculas creadas",
            });
        } else {
            res.status(200).json({
                message: "Todos las Peliculas",
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

//Buscar Peliculas
let search = async (req, res, next) => {
    const { titulo, filter, order } = req.body;
    try {
        const valores = filter.valor;
        const tipo = filter.tipo;

        let ord = {};
        let fil = {};
        //Sentencias con orden por fecha
        if (order !== 'NONE') {
            ord = {
                order: [ ['fecha_creacion', order],]
            }
        }
        //Sentencias con filtro por genero
        if (filter.status) {
            fil = {
                where:{[Op.and]: [
                    { titulo: { [Op.iLike]: '%' + titulo + '%' }},
                    { [tipo]: { [Op.iLike]: '%' + valores + '%' }},
                ]}
            }
        } else {
            //sin filtro 
            fil = { where:{ titulo: { [Op.iLike]: '%' + titulo + '%' } }};
        }
        //Obtener busqueda con consulta armada
        res.json({
            data: await models.PeliculaSerie.findAll({
                order:ord.order,
                where:fil.where
            })
        })
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso: " + e
        });
        next(e)
    }
}

//Actualizar Pelicula
let update = async (req, res, next) => {
    let id = req.body.id;
    const { titulo, imagen, fecha_creacion, calificacion, genero } = req.body;
    try {
        const data = await Models.PeliculaSerie.
            update(
                {
                    titulo: titulo, imagen: imagen, fecha_creacion: fecha_creacion, calificacion: calificacion, genero: genero
                }, {
                where: {
                    id: id,
                    tipo: 'p'
                }
            });
        if (data == 0) {
            res.status(404).send({
                message: "Pelicula no existe",
            });
        } else {
            res.status(200).json({
                message: "Pelicula actualizada correctamente",
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

//Eliminar Pelicula
let remove = async (req, res, next) => {
    let id = req.body.id;
    try {
        const data = await Models.PeliculaSerie.destroy({
            where: {
                id: id,
                tipo: 'p'
            }
        });
        if (data == 1) {
            res.status(200).json({
                message: "Pelicula eliminada correctamente",
            });
        } else {
            res.status(404).send({
                message: "Pelicula no existe",
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
    search,
    update,
    activate,
    desactivate,
    remove
}