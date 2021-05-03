import routerx from 'express-promise-router';
import PersonajeController from '../controllers/personajes.controller';
import { auth } from '../services/auth';

const app = routerx()

//post 

app.post('/add', auth, PersonajeController.add)

app.post('/addPelicula', auth, PersonajeController.addPelicula)
app.post('/addSerie', auth, PersonajeController.addSerie)

//get
app.get('/query', auth, PersonajeController.query);
app.get('/list', auth, PersonajeController.list);
app.get('/search', PersonajeController.search);

//remove
app.delete('/remove', auth, PersonajeController.remove);

//put
app.put('/update', auth, PersonajeController.update);
app.put('/activate', auth, PersonajeController.activate);
app.put('/desactivate', auth, PersonajeController.desactivate);



export default app;