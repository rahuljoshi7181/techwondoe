const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    let response = { status: false, code: 403, message: "", data: "", errors: "" };
    try {
        if (typeof req.headers.authorization === "undefined") {
            response.status = false;
            response.message = "Token missing";
            console.log(response.message);
            res.status(response.code).json(response);
            return res;
        }

        let tokenArr = req.headers.authorization.split(" ");
        if (req.headers.authorization && tokenArr[0] === "Bearer") {
            const token = tokenArr[1];
            if (token) {
                jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        response.status = false;
                        response.message = "Invalid token!";
                        console.log(response.message);
                        res.status(response.code).json(response);
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                response.status = false;
                response.message = "Invalid token!";
                console.log("Token second part is missing: " + response.message);
                res.status(response.code).json(response);
            }
        } else {
            response.status = false;
            response.message = "Invalid token!";
            console.log("Bearer is missing: " + response.message);
            res.status(response.code).json(response);
        }
    } catch (err) {
        response.message = err.stack;
        response.status = false;
        console.log("Authenticate catch: " + response.message);
        res.status(response.code).json(response);
    }
};

const generateToken = (data) => {
    try {
        const req_expireToken = data[0].token_expire;
        const str = req_expireToken + "" + "h";
        data.map((u) => {
            delete u.password;
            return u;
        });
        const token = jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: str });
        return token;
    } catch (err) {
        console.log("------STEP8----");
        console.log(err);
        throw new Error(err);
    }
};

const requestBody = (req) => {
    let method = req.method.toLowerCase();
    let retReq = method == "get" ? { body: req.query } : { body: req.body };
    retReq.params = typeof req.params != "undefined" && Object.keys(req.params).length !== 0 ? req.params : {};
    if ("decoded" in req) {
        if ("data" in req.decoded) {
            retReq.source_id = req.decoded.data[0].id;
            retReq.source_name = req.decoded.data[0].name;
            retReq.source_username = req.decoded.data[0].username;
        }
        retReq.decoded = req.decoded;
    }

    return retReq;
};

module.exports = {
    authenticate,
    generateToken,
    requestBody
};
