const modelsConfig = require(`${appRoot}/models/models.config`);
const { generateToken } = require("../middleware/authenticate");
const moment = require("moment");

class userAuthModel {
    userAuth = async (req) => {
        let response = { status: true, code: 200, message: "" };
        try {
            let data = [{ password: "123456", token_expire: "1" }];
            const issuedAt = moment().format("dddd, MMMM Do YYYY, HH:mm a");
            const expiryTime = moment().add(data[0].token_expire, "hours").format("dddd, MMMM Do YYYY, HH:mm a");
            const token_expire = data[0].token_expire;
            const accessToken = generateToken(data);
            response.status = true;
            response.code = 200;
            response.message = "Your token is generated";
            response.data = { token_expire, accessToken, issuedAt, expiryTime };
        } catch (error) {
            response.message = error;
            response.status = false;
            response.code = 403;
        }

        return response;
    };
}

module.exports = new userAuthModel();
