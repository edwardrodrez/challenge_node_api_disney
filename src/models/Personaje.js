import Sequelize, { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database';


//DEFINE
const Personaje = sequelize.define('personajes',{
    personajeid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    edad: {
        type: Sequelize.INTEGER
    },
    peso: {
        type: Sequelize.FLOAT
    },
    historia: {
        type: Sequelize.TEXT
    },
    imagen: {
        type: Sequelize.BLOB
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


export default Personaje;