// const ApiError = require("../api-error");
// const OrderDetailService = require("../services/orderDetail.service");
// const MongoDB = require("../utils/mongodb.util");


// exports.findAll = async (req, res, next) => {
//     let documents = [];

//     try {
//         const orderDetailService = new OrderDetailService(MongoDB.client);
//         documents = await orderDetailService.find({});

//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving contacs")
//         );
//     };

//     return res.send(documents);

// };

// exports.create = async (req, res, next) => {
//    if (!req.body?.SoDonDH) {
//         return next(new ApiError(404,"Name can not empty"));
//    }

//    try {
//         const orderDetailService = new OrderDetailService(MongoDB.client);
//         const document = await orderDetailService.create(req.body);
//         return res.send(document);
//    } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while creating the staff")
//         );
//    }
// };

// exports.findOne = async (req, res, next) => {
//     try {
//         const orderDetailService = new OrderDetailService(MongoDB.client);
//         console.log(req.params.msdh);
//         const document = await orderDetailService.findBySoDonDH(req.params.msdh);
//         if (!document) {
//             return next(new ApiError(404, "Contact not fuond"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500, `Error retrieving contact with id=${req.params.msdh}`
//             )
//         );
//     }
// }