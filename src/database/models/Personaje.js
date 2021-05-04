import Sequelize, { DataTypes, Model } from 'sequelize';
import { sequelize } from '../conectdb';

class Personaje extends Model {}

Personaje.init({
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, especifique un nombre'
            }
        }
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor, especifique una edad'
            },
            isInt: {
                msg: "La edad debe de ser de tipo numero"
            }
        }
        
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor, especifique un peso'
            },
            isFloat: {
                msg: "El peso debe de ser de tipo float"
            }
        }
    },
    historia: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, especifique una historia'
            }
        }
    },
    imagen: {
        type: Sequelize.BLOB,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, especifique una imagen'
            }
        }
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