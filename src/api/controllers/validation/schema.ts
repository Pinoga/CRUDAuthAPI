import Joi from 'joi';

const Schema = {
	user: {
		id: Joi.string().uuid(),
		firstName: Joi.string().empty(''),
		lastName: Joi.string().empty(''),
		email: Joi.string().email().empty(''),
		password: Joi.string().empty(''),
	},
};

export default Schema;
