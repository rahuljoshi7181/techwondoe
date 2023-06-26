const Joi = require("joi").extend(require("@joi/date"));
const userLogin = Joi.object().keys({
    username: Joi.string().required().email(),
    password: Joi.string().required()
});

const createCompany = Joi.object().keys({
    company_name: Joi.string().required(),
    ceo_name: Joi.string().required(),
    address: Joi.string().required(),
    inception_date: Joi.date().format("YYYY-MM-DD").required()
});

const createTeam = Joi.object().keys({
    tl_name: Joi.string().required(),
    comp_id: Joi.string().required()
});

const getCompany = Joi.object().keys({
    comp_id: Joi.string().required()
});

const getCompanyName = Joi.object().keys({
    comp_name: Joi.string().required()
});


module.exports = {
    userLogin: userLogin,
    createCompany: createCompany,
    createTeam: createTeam,
    getCompany:getCompany,
    getCompanyName:getCompanyName
};
