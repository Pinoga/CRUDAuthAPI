import axios from 'axios';
import { IUserAuthenticationResult, IUserCrudPayload } from '../../Interfaces';

// Serviços de comunicação com a API CRUD
const UserCrud = {
	update: (userData: any): Promise<IUserAuthenticationResult> => {
		const { id, ...data } = userData;
		return axios
			.put(
				`${process.env.REACT_APP_API_URL}/api/user/update/${id}`,
				{ data },
				{ withCredentials: true }
			)
			.then(res => {
				if (res.data.data.payload[0] === 0)
					return Promise.resolve({
						msg: "Couldn't update user, please re-check the fields",
						error: true,
					});
				console.log(res.data);
				return Promise.resolve({
					msg: 'Account data updated',
					error: false,
				});
			})
			.catch(error => Promise.reject({ msg: error.response.data.message, user: true }));
	},
	delete: (userData: any): Promise<IUserAuthenticationResult> => {
		return axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/user/delete/${userData.id}`,
				{},
				{ withCredentials: true }
			)
			.then(res => {
				return Promise.resolve({ msg: 'User successfully deleted', error: false });
			})
			.catch(error => Promise.reject({ msg: error.response.data.message, error: true }));
	},
};

export default UserCrud;
