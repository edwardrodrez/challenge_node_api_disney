import routerx from 'express-promise-router';
import personaje from './personaje';
import usuario from './usuario';
import serie from './serie';
import pelicula from './pelicula';
import { auth } from '../services/auth';

const router = routerx();


router.use('/personaje', auth, personaje);
router.use('/serie', auth, serie);
router.use('/pelicula', auth, pelicula);
router.use('/usuario', usuario);

export default router;