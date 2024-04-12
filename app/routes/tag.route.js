const express = require("express");
const tags = require("../controllers/tag.controller");
const router = express.Router();

router.route("/")
    .get(tags.findAll)
// .get(products.findAll)
// .delete(products.deleteAll);

// router.route("/search")
//     .get(products.findByName)
// // router.route("/favorite")
// //     .get(products.findAllFavorite);

// router.route("/:id")
//     .get(products.findOne)
//     .put(products.update)
//     .delete(products.delete);


// router.route("/mshh/:mshh")
//     .get(products.findByMSHH)
module.exports = router;