const express = require("express");
const reviews = require("../controllers/review.controller");
const router = express.Router();


router.route("/:userId&:bookId")
    .get(reviews.findByBookIdAndUserId)
// .post(products.create)
// .delete(products.deleteAll);
router.route("/")
    .post(reviews.create)

router.route("/:bookId")
    .get(reviews.findByBookId)

router.route("/review/:reviewId")
    .put(reviews.updateReview)

router.route("/find-by-user-id/:userId")
    .get(reviews.findByUserId)
module.exports = router;