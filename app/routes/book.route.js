const express = require("express");
const books = require("../controllers/book.controller");
const router = express.Router();


router.route("/")
    .get(books.findAll)
// .post(products.create)
// .delete(products.deleteAll);

module.exports = router;