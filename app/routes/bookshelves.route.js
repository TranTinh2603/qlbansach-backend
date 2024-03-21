const express = require("express");
const bookshelves = require("../controllers/bookshelves.controller");
const router = express.Router();


router.route("/")
    .get(bookshelves.findAll)
    .post(bookshelves.create)
// // .delete(products.deleteAll);
// router.route("/find/:bookId")
//     .get(books.findById)
router.route("/:userId")
    .get(bookshelves.findByUserId)

module.exports = router;