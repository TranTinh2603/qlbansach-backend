const express = require("express");
const myBooks = require("../controllers/myBook.controller");
const router = express.Router();


router.route("/")
    .get(myBooks.findAll)
// .post(products.create)
// .delete(products.deleteAll);

module.exports = router;