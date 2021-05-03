const { Sequelize, Op } = require('sequelize');
const { database } = require('../settings/sequelize');


export const sequelize =  new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    },
    Op
);




