import Joi from 'joi';

// Schema de validação dos dados do usuário

const Schema = {
	user: {
		id: Joi.string().uuid(),
		firstName: Joi.string().min(1),
		lastName: Joi.string().min(1),
		email: Joi.string().email().min(1),
		password: Joi.string().min(1),
	},
};

export default Schema;
