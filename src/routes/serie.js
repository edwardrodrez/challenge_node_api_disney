import routerx from 'express-promise-router';
import SerieController from '../controllers/series.controller';
import { auth } from '../services/auth';

const app = routerx()

//post 
app.post('/add', auth, SerieController.add)

//get
app.get('/query', auth, SerieController.query);
app.get('/list', auth, SerieController.list);
app.get('/search', SerieController.search);


//remove
app.delete('/remove', auth, SerieController.remove);

//put
app.put('/update', auth, SerieController.update);
app.put('/activate', auth, SerieController.activate);
app.put('/desactivate', auth, SerieController.desactivate);

export default app ;