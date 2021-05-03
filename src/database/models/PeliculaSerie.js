import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../conectdb';


class PeliculaSerie extends Model {}

PeliculaSerie.init({
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    imagen: {
        type: Sequelize.BLOB,
        allowNull: false,
    },
    genero:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: Sequelize.BOOLEAN
    }
},{
    sequelize,
    modelName: "peliculaserie",
    timestamps: false
});




export default PeliculaSerie;