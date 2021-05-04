import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../conectdb';


class PeliculaSerie extends Model {}

PeliculaSerie.init({
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, especifique un titulo'
            }
            
        }
    },
    fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor, especifique una fecha de creacion'
            },
            isDate: {
                msg: "Debe ingresar una fecha valida"
            }
        }
    },
    calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor, especifique una calificacion'
            },
            isInt: {
                msg: "La calificacion debe de ser un numero"
            },
            min: {
                args: 1,
                msg: 'La calificacionpuede ser como minimo 1 y maximo 5'
            },
            max: {
                args: 5,
                msg: 'La calificacionpuede ser como minimo 1 y maximo 5'
            }
        }
    },
    tipo: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
    imagen: {
        type: Sequelize.BLOB,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor, especifique una imagen'
            }
        }
    },
    genero:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, especifique un genero'
            }
        }
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