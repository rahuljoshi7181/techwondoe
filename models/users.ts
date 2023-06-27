import bcrypt from "bcrypt";
import { NotFoundError } from "../exceptions/notFoundError";
import { ClientError } from "../exceptions/clientError";

// Define the code interface for user objects.
export interface IUser {
    id: string;
    username: string;
    // The password is marked as optional to allow us to return this structure
    // without a password value. We'll validate that it is not empty when creating a user.
    password?: string;
    role: Roles;
}

// Our API supports both an admin and regular user, as defined by a role.
export enum Roles {
    ADMIN = "READ_WRITE",
    USER = "READ"
}

// Let's initialize our example API with some user records.
// NOTE: We generate passwords using the Node.js CLI with this command:
// "await require('bcrypt').hash('PASSWORD_TO_HASH', 12)"
let users: { [id: string]: IUser } = {
    "0": {
        id: "0",
        username: "testuser1",
        // Plaintext password: testuser1_password
        password: "$2b$12$ov6s318JKzBIkMdSMvHKdeTMHSYMqYxCI86xSHL9Q1gyUpwd66Q2e",
        role: Roles.USER
    },
    "1": {
        id: "1",
        username: "testuser2",
        // Plaintext password: testuser2_password
        password: "$2b$12$63l0Br1wIniFBFUnHaoeW.55yh8.a3QcpCy7hYt9sfaIDg.rnTAPC",
        role: Roles.USER
    },
    "2": {
        id: "2",
        username: "testuser3",
        // Plaintext password: testuser3_password
        password: "$2b$12$fTu/nKtkTsNO91tM7wd5yO6LyY1HpyMlmVUE9SM97IBg8eLMqw4mu",
        role: Roles.USER
    },
    "3": {
        id: "3",
        username: "testadmin1",
        // Plaintext password: testadmin1_password
        password: "$2b$12$tuzkBzJWCEqN1DemuFjRuuEs4z3z2a3S5K0fRukob/E959dPYLE3i",
        role: Roles.ADMIN
    },
    "4": {
        id: "4",
        username: "testadmin2",
        // Plaintext password: testadmin2_password
        password: "$2b$12$.dN3BgEeR0YdWMFv4z0pZOXOWfQUijnncXGz.3YOycHSAECzXQLdq",
        role: Roles.ADMIN
    }
};

let nextUserId = Object.keys(users).length;
