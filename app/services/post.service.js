const { ObjectId } = require("mongodb");
class PostService {

    constructor(client) {
        this.Post = client.db().collection("posts");

    }
    extractPostData(payload) {
        const post = {
            userId: payload.userId,
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
}


module.exports = PostService;