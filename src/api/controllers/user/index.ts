import { signToken } from './../../authentication/index';
import { Request, Response, NextFunction } from 'express';
import User from '../../../db/models/user';
import ErrorHandler from '../../error/handler';
import UserService from '../../services/user';

const UserController = {
	getUsers: async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log('users');
			const users = await UserService.getUsers();
			res.locals.statusCode = 200;
			res.locals.data = users;
			next();
		} catch (error) {
			next(new ErrorHandler(500, 'Error while fetching users'));
		}
	},
	getUser: async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log('user');
			const user = await UserService.getUser(req.params.id);
			res.locals.statusCode = 200;
			res.locals.data = user;
			next();
		} catch (error) {
			next(new ErrorHandler(500, 'Error while fetching user'));
		}
	},
	deleteUser: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const deleted = await UserService.deleteUser(req.params.id);
			res.locals.statusCode = 200;
			res.locals.data = deleted;
			next();
		} catch (error) {
			next(new ErrorHandler(500, 'Error while deleting user'));
		}
	},
	createUser: async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log('create');
			const user = await UserService.createUser(req.body.data);
			res.locals.statusCode = 200;
			res.locals.data = user;
			next();
		} catch (error) {
			next(new ErrorHandler(500, 'Error while creating user'));
		}
	},
	updateUser: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await UserService.updateUser(req.params.id, req.body.data);
			res.locals.statusCode = 200;
			res.locals.data = user;
			next();
		} catch (error) {
			next(new ErrorHandler(500, 'Error while updating user'));
		}
	},
	signIn: (req: Request, res: Response, next: NextFunction) => {
		res.cookie('token', signToken(req.user as User));
		res.locals.statusCode = 200;
		res.locals.data = req.user;
		next();
	},
	signUp: async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		try {
			const user = await UserService.createUser({ email, password });
			res.cookie('token', signToken(user));
			res.locals.statusCode = 200;
			res.locals.data = user;
			next();
		} catch (error) {
			next(new ErrorHandler(500, 'Error while creating account'));
		}
	},
	signOut: (req: Request, res: Response, next: NextFunction) => {
		res.clearCookie('token');
		res.locals.statusCode = 200;
		res.locals.data = null;
		next();
	},
};

export default UserController;