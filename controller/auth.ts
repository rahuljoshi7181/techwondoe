import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { CustomRequest } from "../middleware/checkJwt";
import config from "../config";
import { ClientError } from "../exceptions/clientError";
import { UnauthorizedError } from "../exceptions/unauthorizedError";
import { getUserByUsername, isPasswordCorrect } from "../state/userState";

class AuthController {
    static login = async (req: Request, res: Response, next: NextFunction) => {
        // Ensure the username and password are provided.
        // Throw an exception back to the client if those values are missing.
        let { username, password } = req.body;
        const user = getUserByUsername(username);

        // Check if the provided password matches our encrypted password.
        if (!user || !(await isPasswordCorrect(user.id, password))) throw new UnauthorizedError("Username and password don't match");

        // Generate and sign a JWT that is valid for one hour.
        const token = sign({ userId: user.id, username: user.username, role: user.role }, config.jwt.secret!, {
            expiresIn: "1h",
            notBefore: "0", // Cannot use before now, can be configured to be deferred.
            algorithm: "HS256",
            audience: config.jwt.audience,
            issuer: config.jwt.issuer
        });

        // Return the JWT in our response.
        res.type("json").send({ token: token });
    };
}
export default AuthController;
