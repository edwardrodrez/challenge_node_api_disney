import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import router from './routes/app';
import session from 'express-session';


const app = express();

const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}


app.set('port', process.env.PORT || 3000);


//middleware
app.use(morgan('dev')); //ver por consola las peticiones que llegan
app.use(cors());

app.use(express.json({ extended:true }));
app.use(express.urlencoded({ extended:true }));

//session
app.use(session({
    secret: 'ssshhhhh', //Tiene que ser aleatorio
    cookie: {maxAge: 60000},
    proxy: true,
    resave: true,
    saveUninitialized: true 
}));

//routes
app.use('/api', cors(corsOptions), router);

//public
app.use(express.static(path.join(__dirname, 'public')));


//servidor escuchando
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en puerto: ', app.get('port'))
});
