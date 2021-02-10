import axios from 'axios';
import { IUserAuthenticationPayload, IUserAuthenticationResult } from '../../Interfaces';

// Serviços de comunicação com a API
const UserAuthentication = {
	authenticateJWT: (): Promise<IUserAuthenticationPayload> => {
		return axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/user/authenticate`,
				{},
				{ withCredentials: true }
			)
			.then(res => {
				return Promise.resolve({ msg: 'User authenticated', user: res.data.data.payload });
			})
			.catch(error => Promise.reject({ msg: error.response.data.message, user: null }));
	},
	login: ({ email, password }: { [key: string]: string }): Promise<IUserAuthenticationResult> => {
		return axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/user/signin`,
				{ email, password },
				{ withCredentials: true }
			)
			.then(res => {
				return Promise.resolve({ msg: 'Login successful', error: false });
			})
			.catch(error => {
				return Promise.reject({ msg: error.response.data.message, error: true });
			});
	},
	register: ({
		email,
		password,
	}: {
		[key: string]: string;
	}): Promise<IUserAuthenticationResult> => {
		return axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/user/signup`,
				{ email, password },
				{ withCredentials: true }
			)
			.then(res => {
				return Promise.resolve({ msg: 'Register successful', error: false });
			})
			.catch(error => Promise.reject({ msg: error.response.data.message, error: true }));
	},
	signout: (): Promise<IUserAuthenticationResult> => {
		return axios
			.post(
				`${process.env.REACT_APP_API_URL}/api/user/signout`,
				{},
				{
					withCredentials: true,
				}
			)
			.then(res => {
				return Promise.resolve({
					msg: 'User successfully signed out',
					error: false,
				});
			})
			.catch(error => Promise.reject({ msg: error.response.data.message, error: true }));
	},
};

export default UserAuthentication;
