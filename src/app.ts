import { startServer } from './api/index';
import Database from './db';
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
