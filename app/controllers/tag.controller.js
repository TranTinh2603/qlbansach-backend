const ApiError = require("../api-error");
const TagService = require("../services/tag.service");
const MongoDB = require("../utils/mongodb.util");


// exports.create = async (req, res, next) => {
//     if (!req.body?.content) {
//         return next(new ApiError(404, "Content can not empty"));
//     }

//     try {
//         const quoteService = new QuoteService(MongoDB.client);
//         const find = await quoteService.findByContent(req.body.content);
//         if (find) {
//             return res.send({ message: "Quote already exists!" })
//         } else {
//             const document = await quoteService.create(req.body)
//             console.log(req.body);
//             return res.send(document);
//         }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while creating the staff")
//         );
//     }
// };

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const tagService = new TagService(MongoDB.client);
        documents = await tagService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };
    return res.send(documents);
};