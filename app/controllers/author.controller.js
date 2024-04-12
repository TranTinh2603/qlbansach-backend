const ApiError = require("../api-error");
const AuthorService = require("../services/author.service");
const MongoDB = require("../utils/mongodb.util");

exports.findByName = async (req, res, next) => {
    try {
        const authorService = new AuthorService(MongoDB.client);
        const document = await authorService.findByName(req.params.name);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.name}`
            )
        );
    }
}
exports.findAll = async (req, res, next) => {
    try {
        const authorService = new AuthorService(MongoDB.client);
        let document = await authorService.findAll({});
        document = document.filter((contact) => contact.name.toLowerCase().includes(req.params.name.toLowerCase()));
        if (!document) {
            // return next(new ApiError(404, "Contact not fuond"));
            return res.send({ message: "Not Found" })
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, `Error retrieving contact with id=${req.params.name}`
            )
        );
    }
}