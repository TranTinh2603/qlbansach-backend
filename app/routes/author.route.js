const express = require("express");
const authors = require("../controllers/author.controller");
const router = express.Router();

router.route("/recommend/:name")
    .get(authors.findLiveSearch)
router.route("/:name")
    .get(authors.findByName)
// .post(products.create)
// .delete(products.deleteAll);

router.route("/")
    .get(authors.findAll)

module.exports = router;