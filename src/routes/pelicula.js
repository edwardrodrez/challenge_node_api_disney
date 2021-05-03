import routerx from 'express-promise-router';
import PeliculaController from '../controllers/pelis.controller';
import { auth } from '../services/auth';

const app = routerx()

//post 
app.post('/add', auth, PeliculaController.add)

//get
app.get('/query', auth, PeliculaController.query);
app.get('/list', auth, PeliculaController.list);
app.get('/search', PeliculaController.search);

//remove
app.delete('/remove', auth, PeliculaController.remove);

//put
app.put('/update', auth, PeliculaController.update);
app.put('/activate', auth, PeliculaController.activate);
app.put('/desactivate', auth, PeliculaController.desactivate);

export default app ;