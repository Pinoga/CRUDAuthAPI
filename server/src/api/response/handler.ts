import { Response, NextFunction } from 'express';
import ErrorHandler from '../error/handler';

type ResponseData = { [key: string]: any };

// A classe que define o formato das respostas da API
class ApiResponse {
	public error: boolean;
	public message: string;
	public data: ResponseData;
	constructor(error: boolean, message: string, data: ResponseData) {
		this.error = error;
		this.message = message;
		this.data = { payload: data };
	}
}

// Endereço final de todas as requisições à API
export const handleResponse = (
	res: Response,
	err: ErrorHandler | null = null,
	next: NextFunction
) => {
	let response, statusCode;
	if (err) {
		response = new ApiResponse(true, err.message, {});
		statusCode = err.statusCode;
	} else {
		response = new ApiResponse(false, '', res.locals.data);
		statusCode = res.locals.statusCode;
	}
	res.status(statusCode).json(response);
};
