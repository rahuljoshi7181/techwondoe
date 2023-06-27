import _ from "lodash";
import { Request, Response, NextFunction } from "express";

export const validate = (useJoiError = false, schemaName = "", moduleName = "") => {
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // enabled HTTP methods for request data validation
    const _supportedMethods = ["post", "put", "get"];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    // return the validation middleware
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(moduleName, "aaaa");
        const route = req.route.path;
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method)) {
            console.log("./" + moduleName + "/index", _useJoiError);
            const Schemas = require("./" + moduleName + "/index")[schemaName];
            // get schema for the current route
            const JoiError = method == "get" ? Schemas.validate(req.query, _validationOptions) : Schemas.validate(req.body, _validationOptions);
            if (JoiError.error) {
                let response = { status: false, code: 403, message: "", data: "", errors: "" };
                let error_message: any = [];

                JoiError.error.details.forEach(getErrorMessages);
                function getErrorMessages(value: any) {
                    error_message.push(value.message.replace(/['"]/g, ""));
                }

                //response.message = "Invalid request data. Please review request and try again!";
                response.message = error_message.length > 0 ? error_message[0] : "";
                response.errors = error_message;
                response.status = false;
                response.code = 403;
                // Custom Error
                const CustomError = {
                    status: false,
                    error: "Invalid request data. Please review request and try again."
                };

                // Send back the JSON error response
                res.status(403).json(_useJoiError ? response : CustomError);
            } else {
                // Replace req.body with the data after Joi validation
                next();
            }
        } else {
            next();
        }
    };
};
