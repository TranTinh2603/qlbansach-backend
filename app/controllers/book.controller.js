const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await bookService.find({});
        // }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};
