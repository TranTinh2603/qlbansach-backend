const express = require("express");
const posts = require("../controllers/post.controller");
const router = express.Router();


router.route("/")
    .get(posts.findAll)
    .post(posts.create)
// .delete(products.deleteAll);
router.route("/:userId")
    .get(posts.findByUserId)

router.route("/update/:id")
    .put(posts.update)
router.route("/update-comment/:id")
    .put(posts.updateComment)

router.route("/update/comment/like/:postId&:commentId")
    .put(posts.updateLikeComment)

router.route("/comment/:postId&:commentId")
    .delete(posts.deleteComment)

router.route("/comment/reply/:postId&:commentId&:replyId")
    .delete(posts.deleteReplyComment)

router.route("/update-reply-comment/:id&:userId&:createdAt")
    .put(posts.updateReplyComment)

module.exports = router;