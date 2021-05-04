import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../conectdb';

class Usuario extends Model {}

Usuario.init({
    rol: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, especifique un rol'
            }
        }
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, ingrese un nombre'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, ingrese un email'
            },
            isEmail: {
                msg: 'Debe ser un formato de email example@email.com'
            }
        }
    },
    tipo_documento: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor, ingrese un tipo de documento'
            }
        }
    },
    nro_documento: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, ingrese un nro de documento'
            }
        }
        
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Por favor, ingrese una password'
            }
        }
    },
    estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.NOW
    }
},{
    sequelize,
    modelName: "usuarios",
    timestamps: false,
})


export default Usuario;