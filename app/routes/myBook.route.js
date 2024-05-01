const express = require("express");
const myBooks = require("../controllers/myBook.controller");
const router = express.Router();


router.route("/")
    .get(myBooks.findAll)
    .post(myBooks.create)
// .delete(products.deleteAll);
router.route("/find")
    .post(myBooks.findByStatus)

router.route("/:userId")
    .get(myBooks.findByUserId)

router.route("/find/:userId&:bookId")
    .get(myBooks.findByUserIdAndBookId)
    .put(myBooks.update)

router.route("/my-book/:id")
    .delete(myBooks.delete)

module.exports = router;