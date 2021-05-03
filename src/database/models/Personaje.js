import Sequelize, { DataTypes, Model } from 'sequelize';
import { sequelize } from '../conectdb';

class Personaje extends Model {}

Personaje.init({
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    historia: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    imagen: {
        type: Sequelize.BLOB,
        allowNull: false,
    },
    estado: {
        type: Sequelize.BOOLEAN
    }
},{
    sequelize,
    modelName: "personajes",
    timestamps: false
})

export default Personaje;