// const ApiError = require("../api-error");
// const CategoryService = require("../services/category.service");
// const ProductService = require("../services/product.service");
// const MongoDB = require("../utils/mongodb.util");

// exports.findAll = async (req, res, next) => {
//     let documents = [];
//     try {
//         const categoryService = new CategoryService(MongoDB.client);
//         documents = await categoryService.findAll({});
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving contacs")
//         );
//     };
//     return res.send(documents);
// };

// exports.findByMaTheLoai = async (req, res, next) => {
//     let documents = [];
//     try {
//         const productService = new ProductService(MongoDB.client);
//         documents = await productService.findByMaTheLoai(req.params.id);
//         if (!documents) {
//             return next(new ApiError(404, "Contact not fuond"));
//         }
//         return res.send(documents);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500, `Error retrieving contact with id=${req.params.id}`
//             )
//         );
//     };
// };
// exports.findOne = async (req, res, next) => {
//     try {
//         const categoryService = new CategoryService(MongoDB.client);
//         const document = await categoryService.findOne(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "Contact not fuond"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500, `Error retrieving contact with id=${req.params.id}`
//             )
//         );
//     };
// };
