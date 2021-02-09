import Joi from 'joi';

// Schema de validação dos dados do usuário

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
