import { NextFunction, Request, Response } from "express";
import { getAllUsers, Roles, getUser } from "../state/userState";
import { ClientError } from "../exceptions/clientError";

class UserController {
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        // Retrieve all users.
        const users = getAllUsers();
        // Return the user information.
        res.status(200).type("json").send(users);
    };

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        // Get the ID from the URL.
        const id: string = req.params.id;

        // Get the user with the requested ID.
        const user = getUser(id);

        // NOTE: We will only get here if we found a user with the requested ID.
        res.status(200).type("json").send(user);
    };
}

export default UserController;
