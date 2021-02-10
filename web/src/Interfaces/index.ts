// Centralização das interface utilizadas na aplicação

export interface IUserAuthenticationResult {
	msg: string;
	error: boolean;
}

export interface IUserAuthenticationPayload {
	msg: string;
	user: IUser | null;
}

export interface IUserCrudPayload {
	msg: string;
	user: IUser | null;
}

export interface IUser {
	[key: string]: any;
	firstName?: string;
	lastName?: string;
	password?: string;
	email?: string;
	id?: string;
}
