import routerx from 'express-promise-router';
import PrecargaController from '../controllers/precarga.controller';

const app = routerx()

//post 
app.get('/precarga', PrecargaController.precarga);

export default app;