const ApiError = require("../api-error.js");
const LoginService = require("../services/login.service.js");
const MongoDB = require('../utils/mongodb.util.js');

exports.create = async (req, res, next) => {
    try {
        console.log(req.body);
        const loginService = new LoginService(MongoDB.client);
        const checkEmail = await loginService.findByEmail(req.body.Email);
        console.log(checkEmail);
        if (!checkEmail) {
            const document = await loginService.create(req.body);
            console.log(document);
            return res.send(document);
        } else {
            return res.send({message: "Tài khoản đã tồn tại"});
        }
       
    } catch (error) {
    console.log(error);
    }
};

