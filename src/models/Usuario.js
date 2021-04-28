import Sequelize, { Model } from 'sequelize';
import { sequelize } from '../database/database';




const Usuario = sequelize.define('usuarios',{
    usuarioid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    rol: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
    },
    tipo_documento: {
        type: Sequelize.STRING
    },
    nro_documento: {
        type: Sequelize.STRING
    },
    password: {
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

export default Usuario;