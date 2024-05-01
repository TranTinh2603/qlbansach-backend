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
exports.findById = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.bookId);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

exports.findByLiveSearch = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const books = await bookService.find({});
        const documents = books.filter(book => book.name.toLowerCase().includes(req.params.searchText.toLowerCase()))

        // const document = await bookService.findById(req.params.bookId);
        if (!documents) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}


exports.findByNameAuthor = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const books = await bookService.find({});
        const authorName = books.filter(book => book.author.toLowerCase().includes(req.params.authorName.toLowerCase()))
        if (!authorName) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(authorName);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

