const express = require("express");
const posts = require("../controllers/post.controller");
const router = express.Router();


router.route("/")
    .get(posts.findAll)
// .post(products.create)
// .delete(products.deleteAll);

module.exports = router;