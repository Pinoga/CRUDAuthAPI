import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';

export interface IAuthenticationForm {
	title: string;
	submitText: string;
	redirectText: string;
	redirectRoute: string;
	submitHandler: (data: any) => void;
}

// Form para autenticação do usuário, seja por meio de login ou cadastro
const AuthenticationForm = (props: IAuthenticationForm) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="auth-form">
			<div className="auth-form-title">{props.title}</div>
			<Form
				onSubmit={e => {
					e.preventDefault();
					props.submitHandler({ email, password });
				}}
			>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</Form.Group>
				<div className="auth-form-footer">
					<Button variant="primary" type="submit" className="auth-form-button">
						{props.submitText}
					</Button>
					<Link to={props.redirectRoute} className="auth-form-redirect">
						{props.redirectText}
					</Link>
				</div>
			</Form>
		</div>
	);
};

export default AuthenticationForm;
