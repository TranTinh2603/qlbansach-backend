const express = require("express");
const groups = require("../controllers/group.controller");
const router = express.Router();


router.route("/")
    // .get(books.findAll)
    .post(groups.create)
// .post(products.create)
// .delete(products.deleteAll);
// router.route("/find/:bookId")
//     .get(books.findById)
router.route("/:userId")
    .get(groups.findByUserId)

module.exports = router;