import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../database/database';



//DEFINE
const PeliculaSerie = sequelize.define('peliculaserie',{
    peliculaserieid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    fecha_creacion: {
        type: Sequelize.DATE
    },
    calificacion: {
        type: Sequelize.INTEGER
    },
    tipo: {
        type: Sequelize.CHAR
    },
    imagen: {
        type: Sequelize.BLOB
    },
    genero:{
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.BOOLEAN
    },
    createat:{
        type: Sequelize.DATE
    }
},{
    timestamps: false
});




export default PeliculaSerie;