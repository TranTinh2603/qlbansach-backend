// const ApiError = require("../api-error");
// const OrderService = require("../services/order.service");
// const MongoDB = require("../utils/mongodb.util");

// exports.create = async (req, res, next) => {
//    if (!req.body?.MSKH) {
//         return next(new ApiError(404,"Name can not empty"));
//    }

//    try {
//         const orderService = new OrderService(MongoDB.client);
//         const document = await orderService.create(req.body);
//         return res.send(document);
//    } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while creating the staff")
//         );
//    }
// };
// exports.update = async (req, res, next) => {
//    if (Object.keys(req.body).length === 0){
//         return next(new ApiError(400, "Data to update can not be empty"));
//    }

//    try {
//         const orderService = new OrderService(MongoDB.client);
//         const document = await orderService.update(req.params.msdh, req.body);
//         if (!document) {
//             return next(new ApiError(404, "Contact not fuond"));
//         }
//         return res.send({ message : "Contact was updated successfully" });
//    } catch (error) {
//         return next(
//             new ApiError(500, `Error updating contact with id=${req.params.msdh}`)
//         );
//    }
// };
// exports.findAll = async (req, res, next) => {
//     let documents = [];

//     try {
//         const orderService = new OrderService(MongoDB.client);
//         documents = await orderService.find({});
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving contacs")
//         );
//     };

//     return res.send(documents);

// };
// exports.findOne = async (req, res, next) => {
//     try {
//         const orderService = new OrderService(MongoDB.client);
//         const document = await orderService.findBySoDonDH(req.params.msdh);
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
// exports.findByMSKH = async (req, res, next) => {
//     let documents = [];
//     try {
//           const orderService = new OrderService(MongoDB.client);
//           console.log(req.body);
//           documents = await orderService.findByMSKH(req.body.MSKH);
//           console.log(documents);
//         if (documents) {
//             return res.send(documents);
//         } else {
//           return next(new ApiError(404, "Contact not fuond"));
//         }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving contacs")
//         );
//     };
// };

// exports.delete = async (req, res, next ) => {
//     try {
//         const orderService = new OrderService(MongoDB.client);
//         const document = await orderService.delete(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "Contact not found"));
//         }

//         return res.send({ message: "Contact was deleted successfully" });
//     } catch (error){
//         return next(
//             new ApiError(
//                 500, `Could not delete contact with id=${req.params.id}`
//             )
//         );
//     }
// };