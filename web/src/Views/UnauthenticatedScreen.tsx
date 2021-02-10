import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Rota para o caso de acesso de usuário não autenticado a alguma rota protegida
const UnauthenticatedScreen = () => {
	const history = useHistory();
	useEffect(() => {
		setTimeout(() => {
			history.push('/login');
		}, 1000);
	}, []);

	return (
		<div className="unauthenticated-screen">
			Unauthenticated user. Redirecting to login screen...
		</div>
	);
};

export default UnauthenticatedScreen;
