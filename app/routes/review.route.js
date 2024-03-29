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
module.exports = router;