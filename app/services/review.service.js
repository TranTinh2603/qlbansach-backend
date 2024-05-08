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
            reviewId: payload.reviewId,
            likes: payload.likes,
            comments: payload.comments
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
    async updateLikeReview(reviewId, likes) {
        const filter = {
            reviewId: reviewId
        };
        const result = await this.ReviewService.findOneAndUpdate(
            filter,
            { $set: { likes: likes } },
            { returnDocument: "after" }
        );

        return result;
    }
    async findReviewById(reviewId) {
        return await this.ReviewService.findOne({
            reviewId: reviewId
        })
    }
    async deleteReview(reviewId) {
        const result = await this.ReviewService.findOneAndDelete({
            reviewId: reviewId
        });

        return result;
    }

}


module.exports = ReviewService;