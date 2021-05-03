import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import router from './routes/app';
import { sequelize } from './database/conectdb';


const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}


app.set('port', port);


//middleware
app.use(morgan('dev')); //ver por consola las peticiones que llegan
app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', cors(corsOptions), router);


//public
app.use(express.static(path.join(__dirname, 'public')));


//servidor escuchando
app.listen(app.get('port'), () => {
    console.log('La app se encuentra corriendo en http://localhost:' + app.get('port'));

    //Conexion a la base , force:fale me genera las tablas si es que estas no existen
    sequelize.sync({ force: false })
        .then(() => {
            console.log('Conexion a la base de datos establecida')
        }).catch(err => {
            console.log('Error en la conexion a la base de datos: ', err)
        })
});
