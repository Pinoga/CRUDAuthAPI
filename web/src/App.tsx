import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthenticationScreen, { AuthType } from './Views/AuthenticationScreen';
import UnauthenticatedScreen from './Views/UnauthenticatedScreen';
import UserScreen from './Views/UserScreen';

// Componente principal com as rotas da aplicação
const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<AuthenticationScreen type={AuthType.SignIn} />
				</Route>
				<Route path="/register">
					<AuthenticationScreen type={AuthType.SignUp} />
				</Route>
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<Route path="/user">
					<UserScreen />
				</Route>
				<Route path="/unauthenticated">
					<UnauthenticatedScreen />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
