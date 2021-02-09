import { NextFunction } from 'express';
import Joi from 'joi';
import ErrorHandler from '../../error/handler';

export default {
    validateRequest: (
        req: any,
        next: NextFunction,
        schema: Joi.ObjectSchema<any>,
        field: string
    ) => {
        const options: Joi.ValidationOptions = {
            abortEarly: false,
            allowUnknown: true,
        };

        const { error, value } = schema.validate(req[field], options);

        if (error) {
            console.log('validation error');
            next(
                new ErrorHandler(
                    400,
                    `Validation error: ${error.details
                        .map((e) => e.message)
                        .join(', ')}`
                )
            );
        } else {
            console.log('validation success');
            req[field] = value;
            next();
        }
    },
};
