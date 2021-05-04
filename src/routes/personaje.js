import routerx from 'express-promise-router';
import PersonajeController from '../controllers/personajes.controller';
import { auth } from '../services/auth';

const app = routerx()

//post 

app.post('/add', PersonajeController.add)

app.post('/addPelicula', PersonajeController.addPelicula)
app.post('/addSerie', PersonajeController.addSerie)

//get
app.get('/query', PersonajeController.query);
app.get('/list', PersonajeController.list);
app.get('/search', PersonajeController.search);

//remove
app.delete('/remove', PersonajeController.remove);

//put
app.put('/update', PersonajeController.update);
app.put('/activate', PersonajeController.activate);
app.put('/desactivate', PersonajeController.desactivate);



export default app;