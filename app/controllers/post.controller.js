const ApiError = require("../api-error");
const PostService = require("../services/post.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const postService = new PostService(MongoDB.client);
        // const { MSHH } = req.query;
        // if (MSHH) {
        //     documents = await productService.findByMSHH(MSHH);
        // } else {
        documents = await postService.find({});
        // }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    };

    return res.send(documents);

};

exports.create = async (req, res, next) => {
    if (!req.body?.userId) {
        return next(new ApiError(404, "Name can not empty"));
    }

    try {
        const postService = new PostService(MongoDB.client);
        const document = await postService.create(req.body);
        console.log(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff")
        );
    }
};

exports.findByUserId = async (req, res, next) => {
    let documents = [];
    try {
        const postService = new PostService(MongoDB.client);
        documents = await postService.findByUserId(req.params.userId)
        return res.send(documents)

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacs")
        );
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const postService = new PostService(MongoDB.client);

        const find = await postService.findById(req.params);
        const liked = find.likes.some(like => like === req.body.userId);
        if (liked) {
            const index = find.likes.indexOf(req.body.userId);
            if (index !== -1) {
                find.likes.splice(index, 1);
            }
        } else {
            find.likes.push(req.body.userId)
        }
        const document = await postService.update(req.params, find)
        if (!document) {
            return res.send({ message: 'Post not found' })
        }
        return res.send({ message: "Post was updated successfully" })
    } catch (error) {

    }
}

exports.updateComment = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const postService = new PostService(MongoDB.client);

        const find = await postService.findById(req.params);
        find.comments.push(req.body);
        console.log(find);

        const document = await postService.update(req.params, find)
        if (!document) {
            return res.send({ message: 'Post not found' })
        }
        return res.send({ message: "Post was updated successfully" })
    } catch (error) {

    }
}

exports.updateReplyComment = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const postService = new PostService(MongoDB.client);
        console.log(req.params);
        const userId = req.params.userId
        const createdAt = req.params.createdAt
        const find = await postService.findById(req.params.id);
        const comment = find.comments.find(comment => comment.userId == userId && comment.createdAt == createdAt);
        comment.replys.push(req.body);
        const document = await postService.update(req.params, find)
        if (!document) {
            return res.send({ message: 'Post not found' })
        }
        return res.send({ message: "Post was updated successfully" })
    } catch (error) {

    }
}

exports.updateLikeComment = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const postService = new PostService(MongoDB.client);

        const post = await postService.findById(req.params.postId);
        if (post) {
            const comment = post.comments.find(comment => comment.commentId === req.params.commentId)
            const check = comment.likes.indexOf(req.body.userId)
            if (check === -1) {
                comment.likes.push(req.body.userId);
            } else {
                comment.likes.splice(check, 1);
            }
            const document = await postService.update(req.params.postId, post)
            if (!document) {
                return res.send({ message: 'Post not found' })
            }
            return res.send({ message: "Post was updated successfully" })
        } else {
            return res.send({ message: 'Post not found' })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const postService = new PostService(MongoDB.client);
        const post = await postService.findById(req.params.postId);
        if (post) {
            const comment = post.comments.findIndex(comment => comment.commentId === req.params.commentId)
            if (comment > -1) {
                post.comments.splice(comment, 1)
            } else {
                return res.send({ message: 'Comment not found' })
            }
            const document = await postService.update(req.params.postId, post)
            if (!document) {
                return res.send({ message: 'Post not found' })
            }
            return res.send({ message: "Post was updated successfully" })
        } else {
            return res.send({ message: 'Post not found' })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteReplyComment = async (req, res, next) => {
    try {
        const postService = new PostService(MongoDB.client);
        const post = await postService.findById(req.params.postId);
        if (post) {
            const comment = post.comments.find(comment => comment.commentId === req.params.commentId)
            if (comment) {
                const reply = comment.replys.findIndex(reply => reply.replyId === req.params.replyId)
                if (reply > -1) {
                    comment.replys.splice(reply, 1)
                } else {
                    return res.send({ message: 'Reply not found' })
                }
                const document = await postService.update(req.params.postId, post)
                if (!document) {
                    return res.send({ message: 'Post not found' })
                }
                return res.send({ message: "Post was updated successfully" })
            } else {
                return res.send({ message: 'Comment not found' })
            }
        } else {
            return res.send({ message: 'Post not found' })
        }
    } catch (error) {
        console.log(error);
    }
}
