import routerx from 'express-promise-router';
import PeliculaController from '../controllers/pelis.controller';
import { auth } from '../services/auth';

const app = routerx()

//post 
app.post('/add', PeliculaController.add)

//get
app.get('/query', PeliculaController.query);
app.get('/list', PeliculaController.list);
app.get('/search', PeliculaController.search);

//remove
app.delete('/remove', PeliculaController.remove);

//put
app.put('/update', PeliculaController.update);
app.put('/activate', PeliculaController.activate);
app.put('/desactivate', PeliculaController.desactivate);

export default app ;