import models from "../database/models/models";
import dataUsuarios from '../database/data/datausuarios'
import dataPersonajes from '../database/data/datapersonajes.json'
import dataPeliserie from '../database/data/datapeliseries.json'
//Usuarios
let precarga = async (req, res, next) => {
    try {
        models.Usuario.bulkCreate(dataUsuarios, { returning: true }) // will return all columns for each row inserted
            .then((result) => {
                console.log(result);
            });

        models.Personaje.bulkCreate(dataPersonajes, { returning: true }) // will return all columns for each row inserted
            .then((result) => {
                console.log(result);
            });
        models.PeliculaSerie.bulkCreate(dataPeliserie, { returning: true }) // will return all columns for each row inserted
            .then((result) => {
                console.log(result);
            });
        res.status(200).json({
            message: "Datos cargados"       
        })

    } catch (e) {
        console.log("Error en el proceso" + e)
    }

}
//Personajes

//Peliculas

//Series

//Asociaciones

export default {
    precarga
}