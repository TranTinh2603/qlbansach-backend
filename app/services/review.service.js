const { ObjectId } = require("mongodb");
class ReviewService {

    constructor(client) {
        this.ReviewService = client.db().collection("reviews");
    }
    extractReviewData(payload) {
        const review = {
            bookId: payload.bookId,
            userId: payload.userId,
            rating: payload.rating,
            review: payload.review,
            createdAt: payload.createdAt,
            reviewId: payload.reviewId
        };
        Object.keys(review).forEach(
            (key) => review[key] === undefined && delete review[key]
        );
        return review;
    }
    async findByUserIdAndBookId(userId, bookId) {
        const cursor = await this.ReviewService.findOne({
            bookId: bookId,
            userId: userId
        });
        return await cursor;
    }
    async findByBookId(bookId) {
        const cursor = await this.ReviewService.find({
            bookId: bookId,
        });
        return await cursor.toArray();
    }
    async create(payload) {
        const review = this.extractReviewData(payload);
        const result = await this.ReviewService.insertOne(
            review,
        );
        return result;
    }
    async findByUserId(userId) {
        const cursor = await this.ReviewService.find({
            userId: userId,
        });
        return await cursor.toArray();
    }
    async update(reviewId, payload) {
        const filter = {
            reviewId: reviewId
        };

        const update = this.extractReviewData(payload);
        const result = await this.ReviewService.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

}


module.exports = ReviewService;