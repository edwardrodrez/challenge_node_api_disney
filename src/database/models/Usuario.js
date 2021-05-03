import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../conectdb';

class Usuario extends Model {}

Usuario.init({
    rol: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Debe ser un formato de email"
            }
        }
    },
    tipo_documento: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nro_documento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
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