import Models from "../models/AllModels";


//Crear Pelicula
let add = async (req, res, next) => {
    const { peliculaserieid, titulo, imagen, fecha_creacion, calificacion, genero } = req.body;
    try {
        const data = await Models.PeliSerie.create({
            peliculaserieid,
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
    let id = req.query.peliculaserieid;
    try {
        const data = await Models.PeliSerie.findOne({
            where: {
                peliculaserieid: id,
                tipo: 'p'
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
        const data = await Models.PeliSerie.findAll({
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

//Actualizar Pelicula
let update = async (req, res, next) => {
    let id = req.body.peliculaserieid;
    const { titulo,  imagen, fecha_creacion, calificacion, genero } = req.body;
    try {
        const data = await Models.PeliSerie.
            update(
                {
                    titulo: titulo, imagen: imagen, fecha_creacion: fecha_creacion, calificacion: calificacion, genero: genero
                }, {
                where: {
                    peliculaserieid: id,
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
    let id = req.body.peliculaserieid;
    try {
        const data = await Models.PeliSerie.destroy({
            where: {
                peliculaserieid: id,
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
    update,
    activate,
    desactivate,
    remove
}