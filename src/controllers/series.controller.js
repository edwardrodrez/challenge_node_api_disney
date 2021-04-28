import Models from "../models/AllModels";


//Crear Serie
let add = async (req, res, next) => {
    const { peliculaserieid, titulo, fecha_creacion, calificacion, genero } = req.body;
    try {
        const data = await Models.PeliSerie.create({
            peliculaserieid,
            titulo,
            fecha_creacion,
            calificacion,
            genero,
            tipo: 's'
        }, {
            field: ['nombre', 'edad', 'peso', 'historia']
        });
        if (data) {
            res.status(200).json({
                message: "Serie creada correctamente",
                data: data
            });
        } else {
            res.status(404).send({
                message: "La serie no ah podido ser creada",
            });
        }

    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}
//Detalle de Serie
let query = async (req, res, next) => {
    let id = req.query.peliculaserieid;
    try {
        const data = await Models.PeliSerie.findOne({
            where: {
                peliculaserieid: id,
                tipo: 's'
            }
        });
        if (!data) {
            res.status(404).send({
                message: "La serie que esta buscando no existe"
            });
        } else {
            res.status(200).json({
                message: "Detalle de Serie",
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

//Listar Series
let list = async (req, res, next) => {
    try {
        const data = await Models.PeliSerie.findAll({
            attributes: ["titulo", "imagen", 'fecha_creacion'],
            where: {
                estado: true,
                tipo: 's'
            }
        });
        if (!data) {
            res.status(404).send({
                message: "No hay series creadas",
            });
        } else {
            res.status(200).json({
                message: "Todos las Series",
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

//Actualizar Serie
let update = async (req, res, next) => {
    let id = req.body.peliculaserieid;
    const { titulo, fecha_creacion, calificacion, genero } = req.body;
    try {
        const data = await Models.PeliSerie.
            update(
                {
                    titulo: titulo, fecha_creacion: fecha_creacion, calificacion: calificacion, genero: genero
                }, {
                where: {
                    peliculaserieid: id,
                    tipo: 's'
                }
            });
        if (data == 0) {
            res.status(404).send({
                message: "Serie no existe",
            });
        } else {
            res.status(200).json({
                message: "Serie actualizada correctamente",
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

//Eliminar Serie
let remove = async (req, res, next) => {
    let id = req.body.peliculaserieid;
    try {
        const data = await Models.PeliSerie.destroy({
            where: {
                peliculaserieid: id,
                tipo: 's'
            }
        });
        if (data == 1) {
            res.status(200).json({
                message: "Serie eliminada correctamente",
            });
        } else {
            res.status(404).send({
                message: "Serie no existe",
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