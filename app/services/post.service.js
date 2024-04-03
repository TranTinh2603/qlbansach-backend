const { ObjectId } = require("mongodb");
class PostService {

    constructor(client) {
        this.Post = client.db().collection("posts");

    }
    extractPostData(payload) {
        const post = {
            userId: payload.userId,
            bookId: payload.bookId,
            content: payload.content,
            createdAt: payload.createdAt,
            likes: payload.likes,
            comments: payload.comments,
        };
        Object.keys(post).forEach(
            (key) => post[key] === undefined && delete post[key]
        );
        return post;
    }
    async find(filter) {
        const cursor = await this.Post.find(filter);
        return await cursor.toArray();
    }
    async create(payload) {
        const post = this.extractPostData(payload);
        const result = await this.Post.insertOne(
            post,
        );
        return result;
    }

    async findByUserId(userId) {
        const cursor = await this.Post.find({
            userId: userId
        })
        return await cursor.toArray();
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractPostData(payload);
        const result = await this.Post.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
    async findById(id) {
        const cursor = await this.Post.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
        return cursor
    }
    //     // async update(id, payload){
    //     //     const filter = {
    //     //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     //     };

    //     //     const update = this.extractProductData(payload);
    //     //     const result = await this.Product.findOneAndUpdate(
    //     //         filter,
    //     //         { $set: update },
    //     //         { returnDocument: "after" }
    //     //     );

    //     //     return result;
    //     // }

}


module.exports = PostService;