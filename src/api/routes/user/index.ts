import { localVerifiedCallback, JWTVerifiedCallback } from './../../authentication/index';
import express from 'express';
import RequestValidator from '../../controllers/validation/routes';
import UserController from '../../controllers/user';

export const UserRouter = express.Router();

// As rotas que necessitam de um body passam antes por um validador

// As rotas que necessitam de um :id passam por uma validação prévia do :id (se ele está no formato uuidv4)
UserRouter.param('id', RequestValidator.userId);

UserRouter.get('/', UserController.getUsers);

UserRouter.get('/:id', UserController.getUser);

UserRouter.post('/delete/:id', UserController.deleteUser);

UserRouter.put('/update/:id', RequestValidator.updateUser, UserController.updateUser);

UserRouter.post('/create', RequestValidator.createUser, UserController.createUser);

// Rota de signin checa se o usuário existe e se as credenciais estão corretas
UserRouter.post('/signin', RequestValidator.signIn, localVerifiedCallback, UserController.signIn);

UserRouter.post('/signup', RequestValidator.signUp, UserController.signUp);

// Verificação do token JWT é feita no ato do signout
UserRouter.post('/signout', JWTVerifiedCallback, UserController.signOut);
