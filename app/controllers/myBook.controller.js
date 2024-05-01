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

exports.findByStatus = async (req, res, next) => {
    let documents = [];
    try {
        const myBookService = new MyBookService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await myBookService.findByStatus(req.body.userId, req.body.status);
        // }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};
exports.findByUserId = async (req, res, next) => {
    let documents = [];
    try {
        const myBookService = new MyBookService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await myBookService.findByUserId(req.params.userId);
        // }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};
exports.findByUserIdAndBookId = async (req, res, next) => {
    try {
        const myBookService = new MyBookService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        const documents = await myBookService.findByUserIdAndBookId(req.params.userId, req.params.bookId);
        // }
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };


};

exports.create = async (req, res, next) => {
    if (!req.body?.userId) {
        return next(new ApiError(404, "Name can not empty"));
    }
    try {
        const myBookService = new MyBookService(MongoDB.client);
        const check = await myBookService.findByUserIdAndBookId(req.body.userId, req.body.bookId);
        if (check) {
            return res.send({ mesage: "Tồn tại" })
        } else {
            console.log(req.body);
            const document = await myBookService.create(req.body);

            return res.send(document);
        }

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff")
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const myBookService = new MyBookService(MongoDB.client);
        const document = await myBookService.update(req.params, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send({ message: "updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const myBookService = new MyBookService(MongoDB.client);
        const document = await myBookService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};

