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
            createdAt: payload.createdAt
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
        console.log(payload);
        const review = this.extractReviewData(payload);
        console.log('', review);
        const result = await this.ReviewService.insertOne(
            review,
        );
        return result;
    }

}


module.exports = ReviewService;