import React, { ChangeEvent, useEffect, useState } from 'react';
import UserCrud from '../Services/user/crud';

import { useHistory, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserAuthentication from '../Services/user/authentication';
import { IUser, IUserCrudPayload } from '../Interfaces';

declare type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// O estado do componente contém os dados do usuário e uma mensagem, que é mostrada no modal
const UserScreen = (props: any) => {
	const history = useHistory();
	console.log(props.user);
	const [screenState, setScreenState] = useState<IUserCrudPayload>({ user: null, msg: '' });

	// Cria um DTO para remover os campos em branco do form
	const handleUpdateUser = () => {
		const updateUserDTO: { [key: string]: any } = {};
		Object.keys(screenState.user as object)
			.filter(field => screenState.user?.[field])
			.forEach(key => (updateUserDTO[key] = screenState.user?.[key]));
		UserCrud.update(updateUserDTO)
			.then(res => {
				setScreenState({ user: { ...screenState.user }, msg: res.msg });
			})
			.catch(error => {
				setScreenState({ user: { ...screenState.user }, msg: error.msg });
			});
	};

	// Tanto no caso de deletar usuário quanto no caso de logout, redireciona para a tela de login e envia a mensagem apropriada
	const handleDeleteUser = () => {
		UserCrud.delete(screenState.user)
			.then(res => {
				history.push({ pathname: '/login', state: { message: res.msg } });
			})
			.catch(error => {
				history.push({ pathname: '/login', state: { message: error.msg } });
			});
	};

	const handleSignOut = () => {
		UserAuthentication.signout()
			.then(res => {
				history.push({ pathname: '/login', state: { message: res.msg } });
			})
			.catch(error => {
				history.push({ pathname: '/login', state: { message: error.msg } });
			});
	};

	const handleCloseMsg = () => {
		setScreenState({ ...screenState, msg: '' });
	};

	// Como o form é um componente controlado, devemos manter controle de todas as alterações nos inputs
	const handleFormChange = (e: ChangeEvent<FormControlElement>) => {
		console.log(e.target.id);
		setScreenState({
			...screenState,
			user: {
				...screenState.user,
				[e.target.id]: e.target.value,
			},
		});
	};

	// Ao renderizar a página, autentica o usuário através do cookie 'token' que possui o JWT, redirecionando-o para a tela de erro em caso de falha
	useEffect(() => {
		UserAuthentication.authenticateJWT()
			.then(res => {
				console.log(res.user);
				setScreenState({ ...screenState, user: res.user });
			})
			.catch(error => {
				history.push({ pathname: '/unauthenticated', state: { message: error.msg } });
			});
	}, []);

	return (
		<div className="user-screen">
			<Modal show={screenState.msg !== ''} onHide={handleCloseMsg}>
				<Modal.Body>{screenState.msg}</Modal.Body>
			</Modal>
			<Button variant="secondary" className="signout-button" onClick={handleSignOut}>
				Sign Out
			</Button>
			Welcome to the user page!
			<div className="auth-form">
				<div className="auth-form-title">Update account data</div>
				<Form
					onSubmit={e => {
						e.preventDefault();
						handleUpdateUser();
					}}
				>
					<Form.Group>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type="text"
							id="firstName"
							placeholder="Enter first name"
							value={screenState.user?.firstName ?? ''}
							onChange={e => handleFormChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="text"
							id="lastName"
							placeholder="Enter last name"
							value={screenState.user?.lastName ?? ''}
							onChange={e => handleFormChange(e)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							id="email"
							placeholder="Enter new email"
							value={screenState.user?.email ?? ''}
							onChange={e => handleFormChange(e)}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							id="password"
							placeholder="Enter new password"
							value={screenState.user?.password ?? ''}
							onChange={e => handleFormChange(e)}
						/>
					</Form.Group>
					<div className="auth-form-footer">
						<Button variant="primary" type="submit" className="auth-form-button">
							Update
						</Button>
						<Button
							variant="secondary"
							className="auth-form-button"
							onClick={handleDeleteUser}
						>
							Delete Account
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default UserScreen;
