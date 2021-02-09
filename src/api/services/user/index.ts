import User from '../../../db/models/user';

const UserService = {
	getUsers: async () => {
		try {
			const users = await User.findAll();
			console.log(users);
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
			console.log('create service');
			const user = await User.create(data);
			return Promise.resolve(user);
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	},
	updateUser: async (id: string, data: any) => {
		try {
			const user = await User.update({}, { where: { id }, returning: true });
			return Promise.resolve(user);
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	},
};

export default UserService;
