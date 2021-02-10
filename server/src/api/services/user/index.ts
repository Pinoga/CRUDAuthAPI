import User from '../../../db/models/user';

// Os serviços retornam uma Promise para os controllers, indicando se houve erro interno ou não
const UserService = {
	getUsers: async () => {
		try {
			const users = await User.findAll();
			return Promise.resolve(users);
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	},
	getUser: async (id: string, field: string = 'id') => {
		try {
			const user = await User.findOne({
				where: { [field]: id },
			});
			return Promise.resolve(user);
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	},
	deleteUser: async (id: string) => {
		try {
			const deleted = await User.destroy({ where: { id } });
			return Promise.resolve(deleted);
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	},
	createUser: async (data: any) => {
		try {
			const user = await User.create(data);
			return Promise.resolve(user);
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	},
	updateUser: async (id: string, data: any) => {
		try {
			const user = await User.update(data, { where: { id }, returning: true });
			console.log(user);
			return Promise.resolve(user);
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	},
};

export default UserService;
