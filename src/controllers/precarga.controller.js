import models from "../database/models/models";

//DATOS DE PRUEBAS _ para cargar a la base
import dataUsuarios from '../database/data/datausuarios'
import dataPersonajes from '../database/data/datapersonajes'
import dataPeliserie from '../database/data/datapeliseries'
import dataPersonajePS from '../database/data/dataasociaciones'


let precarga = async (req, res, next) => {
    try {
        models.Usuario.bulkCreate(dataUsuarios, { returning: true })
            .then((result) => {
                console.log(result);
            });
        models.Personaje.bulkCreate(dataPersonajes, { returning: true })
            .then((result) => {
                console.log(result);
            });
        models.PeliculaSerie.bulkCreate(dataPeliserie, { returning: true })
            .then((result) => {
                console.log(result);
            });
        models.personaje_peliculaserie.bulkCreate(dataPersonajePS, { returning: true })
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

export default {
    precarga
}