const express = require("express");
const authors = require("../controllers/author.controller");
const router = express.Router();


router.route("/:name")
    .get(authors.findByName)
// .post(products.create)
// .delete(products.deleteAll);

module.exports = router;