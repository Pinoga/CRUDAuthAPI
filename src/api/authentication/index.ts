import JWT, { Secret } from 'jsonwebtoken';
import passport from 'passport';
import { Request, NextFunction, Response } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';

import User from '../../db/models/user';
import ErrorHandler from '../error/handler';

export const signToken = (user: User) =>
	JWT.sign(
		{
			iss: process.env.JWT_ISS,
			sub: user.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1),
		},
		process.env.JWT_SECRET as Secret
	);

const configureAuthentication = () => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email', passwordField: 'password' },
			(username, password, done) => {
				console.log(`authenticating ${username}${password}`);
				User.findOne({ where: { email: username } })
					.then(user => {
						if (user && user.password === password) {
							return done(null, user);
						} else {
							return done(null, false, {
								message: 'Incorrect username and/or password',
							});
						}
					})
					.catch(error => done(error));
			}
		)
	);

	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: req => (req?.cookies ? req.cookies.token : null),
				secretOrKey: process.env.JWT_SECRET,
				passReqToCallback: true,
			},
			(req: Request, payload: any, done: VerifiedCallback) => {
				console.log('authenticating jwt');
				console.log(payload.sub);
				User.findOne({
					where: { id: payload.sub },
				})
					.then(user => {
						if (!user) return done(null, false, { message: 'Invalid token' });
						req.user = user;
						done(null, user);
					})
					.catch(error => done(new ErrorHandler(500, 'Internal Server Error'), false));
			}
		)
	);

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user: User, done) {
		done(null, user);
	});
};

export const localVerifiedCallback: VerifiedCallback = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate('local', { session: false }, (error, user, info) => {
		if (error) return next(error);
		if (!user) return next(new ErrorHandler(401, info.message));
		req.login(user, function (err) {
			if (err) {
				return next(new ErrorHandler(500, err.message));
			}
			return next();
		});
	})(req, res, next);
};

export const JWTVerifiedCallback: VerifiedCallback = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate('jwt', { session: false }, (error, user, info) => {
		if (error) return next(error);
		if (!user) return next(new ErrorHandler(401, info.message));
		req.login(user, function (err) {
			if (err) {
				return next(new ErrorHandler(500, 'Internal Server Error'));
			}
			return next();
		});
	})(req, res, next);
};

export default configureAuthentication;
