import { Response, NextFunction } from 'express';
import ErrorHandler from '../error/handler';

type ResponseData = { [key: string]: any };

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

export const handleResponse = (
    res: Response,
    err: ErrorHandler | null = null,
    next: NextFunction
) => {
    let response, statusCode;
    if (err) {
        console.log('error response');
        response = new ApiResponse(true, err.message, {});
        statusCode = err.statusCode;
    } else {
        console.log('success response');
        response = new ApiResponse(false, '', res.locals.data);
        statusCode = res.locals.statusCode;
    }
    res.status(statusCode).send(response);
};
