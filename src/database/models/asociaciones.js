import PeliculaSerie from './PeliculaSerie';
import Personaje from './Personaje';
import { sequelize } from '../conectdb';

const personaje_peliculaserie = sequelize.define('personaje_peliculaserie', {}, { timestamps: false });


//UN PERSONAJE PUEDE ESTAR EN MUCHAS PELICULAS o SERIES
Personaje.belongsToMany(PeliculaSerie, { through: personaje_peliculaserie });
//EN UNA PELICULA o SERIE PUEDEN ESTAR MUCHOS PERSONAJES
PeliculaSerie.belongsToMany(Personaje, { through: personaje_peliculaserie });

export default personaje_peliculaserie;