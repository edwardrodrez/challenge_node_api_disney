import routerx from 'express-promise-router';
import SerieController from '../controllers/series.controller';
import { auth } from '../services/auth';

const app = routerx()

//post 
app.post('/add', SerieController.add)

//get
app.get('/query', SerieController.query);
app.get('/list', SerieController.list);
app.get('/search', SerieController.search);


//remove
app.delete('/remove', SerieController.remove);

//put
app.put('/update', SerieController.update);
app.put('/activate', SerieController.activate);
app.put('/desactivate', SerieController.desactivate);

export default app ;