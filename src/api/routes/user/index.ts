import { localVerifiedCallback, JWTVerifiedCallback } from './../../authentication/index';
import express from 'express';
import passport from 'passport';
import RequestValidator from '../../controllers/validation/routes';
import UserController from '../../controllers/user';
export const UserRouter = express.Router();

UserRouter.param('id', RequestValidator.userId);

UserRouter.get('/', UserController.getUsers);

UserRouter.get('/:id', UserController.getUser);

UserRouter.post('/delete/:id', UserController.deleteUser);

UserRouter.put('/update/:id', RequestValidator.updateUser, UserController.updateUser);

UserRouter.post('/create', RequestValidator.createUser, UserController.createUser);

UserRouter.post('/signin', RequestValidator.signIn, localVerifiedCallback, UserController.signIn);

UserRouter.post('/signup', RequestValidator.signUp, UserController.signUp);

UserRouter.post('/signout', JWTVerifiedCallback, UserController.signOut);
