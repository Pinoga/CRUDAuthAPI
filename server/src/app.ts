import { startServer } from './api/index';
import Database from './db';

// Aborta a aplicação se houver erro nos procedimento iniciais do banco de dados
(async () => {
	try {
		const sequelize = await Database.connect();
		const server = startServer(sequelize);
		server.listen(process.env.PORT, () => {
			console.log(`Server is listening on port ${process.env.PORT}`);
		});
	} catch (err) {
		process.abort();
	}
})();
