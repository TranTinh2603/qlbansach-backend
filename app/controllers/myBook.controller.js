const ApiError = require("../api-error");
const MyBookService = require("../services/myBook.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const myBookService = new MyBookService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await myBookService.find({});
        // }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};
