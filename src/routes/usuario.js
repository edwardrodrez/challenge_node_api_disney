import routerx from 'express-promise-router';
import UsuarioController from '../controllers/usuarios.controller';
import { auth } from '../services/auth';
const app = routerx()

//post 
app.post('/login', UsuarioController.login);
app.post('/register', UsuarioController.register);
app.get('/logout',auth, UsuarioController.logout);

export default app ;