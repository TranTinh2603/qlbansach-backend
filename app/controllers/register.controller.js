// const ApiError = require("../api-error.js");
// const LoginService = require("../services/login.service.js");
// const MongoDB = require('../utils/mongodb.util.js');

// exports.create = async (req, res, next) => {
//     try {
//         console.log(req.body);
//         const loginService = new LoginService(MongoDB.client);
//         const checkEmail = await loginService.findByEmail(req.body.Email);
//         console.log(checkEmail);
//         if (!checkEmail) {
//             const document = await loginService.create(req.body);
//             console.log(document);
//             return res.send(document);
//         } else {
//             return res.send({ message: "Tài khoản đã tồn tại" });
//         }

//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving contacs")
//         );
//     }
// };

const ApiError = require("../api-error.js");
const LoginService = require("../services/login.service.js");
const MongoDB = require('../utils/mongodb.util.js');

exports.create = async (req, res, next) => {
    try {
        // Lấy dữ liệu từ request body
        const userData = req.body;
        console.log(userData);

        // Khởi tạo một đối tượng LoginService với đối tượng MongoDB đã kết nối
        const loginService = new LoginService(MongoDB.client);

        // Kiểm tra xem có người dùng nào có cùng email như đã gửi hay không
        const existingUser = await loginService.findByEmail(userData.email);

        // Nếu không có người dùng nào tồn tại với email đã gửi, tiến hành tạo mới người dùng
        if (!existingUser) {
            const newUser = await loginService.create(userData);
            return res.send(newUser); // Trả về người dùng mới được tạo thành công
        } else {
            return res.send({ message: "Tài khoản đã tồn tại" }); // Trả về thông báo lỗi nếu tài khoản đã tồn tại
        }
    } catch (error) {
        // Nếu có bất kỳ lỗi nào xảy ra trong quá trình xử lý yêu cầu, bắt và chuyển tiếp lỗi đến middleware xử lý lỗi tiếp theo
        return next(new ApiError(500, "An error occurred while processing the request"));
    }
};


