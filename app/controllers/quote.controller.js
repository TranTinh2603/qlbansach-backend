const ApiError = require("../api-error");
const QuoteService = require("../services/quote.service");
const TagService = require("../services/tag.service");
const MongoDB = require("../utils/mongodb.util");

exports.findByUserId = async (req, res, next) => {
    let documents = [];

    try {
        const quoteService = new QuoteService(MongoDB.client);
        documents = await quoteService.findByUserId(req.params.userId);
        if (documents.length > 0) {
            return res.send(documents);
        } else {
            return res.send({ message: "No documents found" });
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };


};
exports.findByQuoteId = async (req, res, next) => {
    let documents = [];

    try {
        const quoteService = new QuoteService(MongoDB.client);
        documents = await quoteService.findByQuoteId(req.params.quoteId);
        if (documents) {
            return res.send(documents);
        } else {
            return res.send({ message: "No documents found" });
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };


};

exports.create = async (req, res, next) => {
    if (!req.body?.content) {
        return next(new ApiError(404, "Content can not empty"));
    }

    try {
        const quoteService = new QuoteService(MongoDB.client);
        const tagService = new TagService(MongoDB.client);
        const find = await quoteService.findByContent(req.body.content);
        if (find) {
            return res.send({ message: "Quote already exists!" })
        } else {
            console.log(req.body);
            const tags = req.body.tags.split(',')
            console.log(tags);
            for (const tag of tags) {
                const dataTag = {
                    tagId: '',
                    name: tag
                }
                const checkTag = await tagService.findByName(tag);
                if (!checkTag) {
                    const addTag = await tagService.create(dataTag)
                    console.log(addTag);
                }
            }
            const document = await quoteService.create(req.body)
            return res.send(document);
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff")
        );
    }
};

exports.createSocket = async (data) => {
    try {
        const quoteService = new QuoteService(MongoDB.client);
        const tagService = new TagService(MongoDB.client);
        const find = await quoteService.findByContent(data.content);
        if (find) {
            return ({ message: "Quote already exists!" })
        } else {
            const tags = data.tags.split(',')
            console.log(tags);
            for (const tag of tags) {
                const dataTag = {
                    tagId: '',
                    name: tag
                }
                const checkTag = await tagService.findByName(tag);
                if (!checkTag) {
                    const addTag = await tagService.create(dataTag)
                    console.log(addTag);
                }
            }
            const dataLocal = {
                userId: data.userId,
                quoteId: data.quoteId,
                content: data.content,
                author: data.author,
                tags: tags,
                book: data.book,
                likes: data.likes,
                createdAt: data.createdAt
            }
            const document = await quoteService.create(dataLocal)
            if (!document) {
                return { message: "Failed to create quote" }
            } else {
                return document;
            }
        }
    } catch (error) {
        console.log(error);
    }
}
exports.findAllSocket = async () => {
    try {
        const quoteService = new QuoteService(MongoDB.client)
        const document = quoteService.find({});
        return document;
    } catch (error) {
        console.log(error);
    }
}

exports.updateLikesSocket = async (quote, userId) => {
    try {
        const quoteService = new QuoteService(MongoDB.client)
        const data = await quoteService.findByQuoteId(quote.quoteId)
        const index = data.likes.indexOf(userId)
        if (index !== -1) {
            data.likes.splice(index, 1)
        } else {
            data.likes.push(userId)
        }
        const document = await quoteService.update(quote.quoteId, data)
        return document;
    } catch (error) {

    }
}

exports.updateQuoteSocket = async (quote) => {
    try {
        const quoteService = new QuoteService(MongoDB.client);
        let tags = quote.tags;

        if (typeof tags === 'string') {
            tags = tags.split(' ').join('').split(',');
        } else if (Array.isArray(tags)) {
            tags = tags;
        } else {
            return { message: 'Kiểu dữ liệu không được hỗ trợ' };
        }

        quote.tags = tags;
        const document = await quoteService.update(quote.quoteId, quote);
        if (document) {
            return { message: 'Update quote successfuly' }
        } else {
            return { message: 'Update quote failure' }
        }
    } catch (error) {
        console.log(error);
    }
}
exports.delete = async (req, res, next) => {
    try {
        const quoteService = new QuoteService(MongoDB.client);
        const document = await quoteService.delete(req.params.quoteId);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }

        return res.send({ message: "Quote was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500, `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};
exports.deleteSocket = async (quoteId) => {
    try {
        const quoteService = new QuoteService(MongoDB.client);
        const document = await quoteService.delete(quoteId);
        if (!document) {
            return { message: "Could not delete quote" };
        }
        return { message: "Quote was deleted successfully" };
    } catch (error) {
        console.log(error);
    }
};
