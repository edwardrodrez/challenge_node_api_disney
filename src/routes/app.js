import routerx from 'express-promise-router';
import personaje from './personaje';
import usuario from './usuario';
import serie from './serie';
import pelicula from './pelicula';
import precarga from './precarga';

import { auth } from '../services/auth';

const router = routerx();


router.use('/personaje', personaje);
router.use('/serie', serie);
router.use('/pelicula', pelicula);
router.use('/usuario', usuario);
router.use('/precarga', precarga);

export default router;