const ApiError = require("../api-error");
const ReviewService = require("../services/review.service");
const MongoDB = require("../utils/mongodb.util");

exports.findByBookIdAndUserId = async (req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        console.log(req.params);
        const document = await reviewService.findByUserIdAndBookId(req.params.userId, req.params.bookId);
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
exports.findByBookId = async (req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        console.log(req.params);
        const document = await reviewService.findByBookId(req.params.bookId);
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

exports.findByUserId = async (req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        const document = await reviewService.findByUserId(req.params.userId);
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

exports.findByReviewId = async (req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        const document = await reviewService.findReviewById(req.params.reviewId);
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

exports.create = async (req, res, next) => {
    if (!req.body?.userId) {
        return next(new ApiError(404, "Contact not fuond"));
    }
    try {
        const reviewService = new ReviewService(MongoDB.client);
        const check = await reviewService.findByUserIdAndBookId(req.body.userId, req.body.bookId);
        if (check) {
            return res.send({ message: "Book rate already exists" })
        } else {
            const document = await reviewService.create(req.body);
            if (document) {
                return res.send({ document, message: "Rating is successfully updated" });
            }
        }
    } catch (error) {

    }
}

exports.updateReview = async (req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        const document = await reviewService.update(req.params.reviewId, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not fuond"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.deleteReview = async (req, res, next) => {
    try {
        const reviewService = new ReviewService(MongoDB.client);
        const document = await reviewService.deleteReview(req.params.reviewId);
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