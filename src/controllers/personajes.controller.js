
import models from '../database/models/models';
import Models from '../database/models/models';
import PeliculaSerie from '../database/models/PeliculaSerie';

const { Op } = require("sequelize");


//Crear Personaje
let add = async (req, res, next) => {
    const { nombre, edad, imagen, peso, historia } = req.body;
    try {

        const data = await Models.Personaje.create({
            nombre,
            edad,
            imagen,
            peso,
            historia
        }, {
            field: ['nombre', 'edad', 'imagen', 'peso', 'historia']
        })
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

//Agregar Pelicula al personaje
let addPelicula = async (req, res, next) => {
    const { idPersonaje, idPelicula } = req.body;
    try {
        const pelicula = await Models.Personaje.findOne({
            where: {
                id: idPelicula,
            }
        });
        if (pelicula) {
            const personaje = await Models.Personaje.findOne({
                where: {
                    id: idPersonaje
                }
            }).associations({
                pelicula
            });
            if (personaje) {
                res.status(200).json({
                    message: "Pelicula agregada correctamente",
                    data: peliculaagregada
                });
            } else {
                res.status(404).send({
                    message: "El personaje no existe"
                });
            }
        } else {
            res.status(404).send({
                message: "Lapelicula a agregar no existe"
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso" + e
        });
        next(e)
    }
}

//Agregar Serie al Personaje
let addSerie = async (req, res, next) => {
    const { nombre, edad, imagen, peso, historia } = req.body;
    try {
        const data = await Models.Personaje.create({
            nombre,
            edad,
            imagen,
            peso,
            historia
        }, {
            field: ['nombre', 'edad', 'imagen', 'peso', 'historia']
        });
        models.Personaje.associations({
            peliserie
        })
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
    let id = req.query.id;
    try {
        const data = await Models.Personaje.findOne({
            where: {
                id: id
            },
            include: {
                model: PeliculaSerie,
                attributes: ["titulo", "fecha_creacion", "calificacion", "genero", "tipo", "imagen",],
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
            attributes: ["nombre", "imagen",],
            where: {
                estado: true
            },
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

//Buscar Personajes
let search = async (req, res, next) => {
    const { nombre, filter } = req.body;
    try {
        const valores = filter.valor;
        const tipo = filter.tipo;

        let fil = {};
        //Con filtro
        if (filter.status) {
            //Filtrado es por Pelicula/serie
            if(tipo === 'peliserie'){
                fil = {
                    where: {
                        nombre: { [Op.iLike]: '%' + nombre + '%' },
                    }, include: {
                        model: PeliculaSerie,
                        where: {
                            titulo: { [Op.iLike]: '%' + valores + '%' }
                        }
                    }
                }
                console.log(fil)
            }else{
                //FIltrado es por nombre o edad = tipo 
                fil = {
                    where: {
                        [Op.and]: [
                            { nombre: { [Op.iLike]: '%' + nombre + '%' } },
                            { [tipo]: [valores] }
                        ]
                    }
                }
            }
        } else {
            //Sin filtro 
            fil = { where: { nombre: { [Op.iLike]: '%' + nombre + '%' } } };
        }
        res.json({
            data: await models.Personaje.findAll({     
                where: fil.where,
                include:fil.include
            })
        })

    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso: " + e
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
                    id: id
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
                id: id
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
    addPelicula,
    addSerie,
    query,
    list,
    search,
    update,
    activate,
    desactivate,
    remove
}