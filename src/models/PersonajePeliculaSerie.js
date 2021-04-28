import Sequelize, { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import PeliculaSerie from './PeliculaSerie';
import Personaje from './Personaje';




//RELACION MUCHOS A MUCHOS TABLA PersonajePeliSerie
const PersonajePeliculaSerie = sequelize.define('personajepeliculaserie', {
    personajeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Personaje, //Modelo Personaje 
        key: 'personajeId'
      }
    },
    peliculaserieId: {
      type: DataTypes.INTEGER,
      references: {
        model: PeliculaSerie, //Modelo PeliculaSerie
        key: 'peliculaserieId'
      }
    }
  });

//UN PERSONAJE PUEDE ESTAR EN MUCHAS PELICULAS o SERIES
Personaje.belongsToMany(PeliculaSerie, { through: PersonajePeliculaSerie });
//EN UNA PELICULA o SERIE PUEDEN ESTAR MUCHOS PERSONAJES
PeliculaSerie.belongsToMany(Personaje, { through: PersonajePeliculaSerie });

export default PersonajePeliculaSerie;