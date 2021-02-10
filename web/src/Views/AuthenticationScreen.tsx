import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import AuthenticationForm, { IAuthenticationForm } from '../Components/AuthenticationForm';
import UserAuthentication from '../Services/user/authentication';

interface IAuthenticationScreen {
	type: AuthType;
}

export enum AuthType {
	SignIn = 0,
	SignUp,
}

// Tela de autenticação, que pode ser tanto para login quanto para registro
// TODO: useEffect acaba mostrando o modal após refresh porque location.state.message ainda persiste no histórico
const AuthenticationScreen = (props: IAuthenticationScreen) => {
	const history = useHistory();
	const location = useLocation() as any;
	const [error, setError] = useState('');

	// Se há alguma mensagem a ser exibida após o redirect, carrega o modal
	useEffect(() => {
		const message = location.state?.message;
		if (message) handleShow(message);
	}, []);

	const handleShow = (error: any) => setError(error);
	const handleClose = () => setError('');

	// Dados para as views das forms de cadastro e login
	const getFormProps = (type: AuthType): IAuthenticationForm => {
		let submitText, title, submitHandler, redirectRoute, redirectText;
		switch (type) {
			case AuthType.SignIn:
				title = 'Sign In';
				submitText = 'Submit';
				submitHandler = handleSignIn;
				redirectText = "Doesn't have an account?";
				redirectRoute = '/register';
				break;
			case AuthType.SignUp:
				title = 'Sign Up';
				submitText = 'Submit';
				submitHandler = handleSignUp;
				redirectText = 'Already have an account?';
				redirectRoute = '/login';
				break;
			default:
				throw new Error('Wrong authentication prop type');
		}
		return { submitText, title, redirectRoute, redirectText, submitHandler };
	};

	// Redirect para /user caso login seja bem-sucedido
	const handleSignIn = (data: any) => {
		console.log(data);
		UserAuthentication.login(data)
			.then(res => {
				history.push({ pathname: '/user', state: { message: res.msg } });
			})
			.catch(error => handleShow(error.msg));
	};

	// Após cadastro, também redireciona para a rota /user
	const handleSignUp = async (data: any) => {
		UserAuthentication.register(data)
			.then(res => {
				history.push({ pathname: '/user', state: { message: res.msg } });
			})
			.catch(error => handleShow(error.msg));
	};

	return (
		<div className="auth-screen">
			<Modal show={error !== ''} onHide={handleClose}>
				<Modal.Body>{error}</Modal.Body>
			</Modal>
			<AuthenticationForm {...getFormProps(props.type)} />
		</div>
	);
};

export default AuthenticationScreen;
