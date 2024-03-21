const ApiError = require("../api-error");
const BookshelvesService = require("../services/bookshelves.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(404, "Name can not empty"));
    }

    try {
        const bookshelvesService = new BookshelvesService(MongoDB.client);
        const document = await bookshelvesService.create(req.body);
        console.log(document);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookshelvesService = new BookshelvesService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await bookshelvesService.find({});
        // }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};

exports.findByUserId = async (req, res, next) => {
    try {
        const bookshelvesService = new BookshelvesService(MongoDB.client);
        const document = await bookshelvesService.findByUserId(req.params.userId);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params}`
            )
        );
    }
}
