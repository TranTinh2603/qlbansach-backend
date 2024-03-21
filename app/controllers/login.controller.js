const ApiError = require("../api-error.js");
const LoginService = require("../services/login.service.js");
const MongoDB = require('../utils/mongodb.util.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.findByEmail = async (req, res, next) => {
    try {
        console.log(req.body);
        const loginService = new LoginService(MongoDB.client);
        const document = await loginService.findByEmail(req.body.Email);
        if (!document) {
            return next(new ApiError(404, "Email not found"));
        }
        const hashedStoredPassword = await bcrypt.hash(document.Password, 10);


        const passwordMatch = await bcrypt.compare(req.body.Password, hashedStoredPassword);
        if (passwordMatch) {
            const token = jwt.sign({ email: document.Email }, '1234567', { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
        }
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.body.email}`
            )
        );
    }
};

// exports.findByMSNV = async (req, res, next) => {
//     try {
//         console.log(req.body.MSNV);
//         const loginService = new LoginService(MongoDB.client);
//         const document = await loginService.findByMSNV(req.body.MSNV);
//         console.log(document);
//         if (!document) {
//             return next(new ApiError(404, "Email not found"));
//         }
//         const hashedStoredPassword = await bcrypt.hash(document.Password, 10);
//         const passwordMatch = await bcrypt.compare(req.body.Password, hashedStoredPassword);
//         if (passwordMatch) {
//             const token = jwt.sign({ MSNV: document.MSNV }, '1234567', { expiresIn: '1h' });
//             return res.json({ token });
//         } else {
//             return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng" });
//         }
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500, `Error retrieving contact with id=${req.body.MSNV}`
//             )
//         );
//     }
// }
