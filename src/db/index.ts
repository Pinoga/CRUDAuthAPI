import User from './models/user/index';
import { Sequelize } from 'sequelize';

const authenticate = (sequelize: Sequelize) => {
	return new Promise((resolve, reject) => {
		sequelize
			.authenticate()
			.then(() => {
				console.log('Connection has been established successfully.');
				resolve(null);
			})
			.catch(error => {
				console.log('Unable to connect to the database:', error);
				reject();
			});
	});
};

export default {
	connect: async () => {
		const models = [User];
		const sequelize = new Sequelize(
			`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`,
			{
				define: { freezeTableName: true },
			}
		);

		// Inicialização dos modelos, espelhamento nas tabelas do banco e criação de usuário root na tabela User
		return authenticate(sequelize)
			.then(() => models.forEach(m => m.initialize(sequelize)))
			.then(() => sequelize.sync({ force: true }))
			.then(() => User.create({ email: 'root@root.com', password: 'root' }))
			.then(() => sequelize);
	},
};
