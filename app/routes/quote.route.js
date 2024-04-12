const express = require("express");
const quotes = require("../controllers/quote.controller");
const router = express.Router();

router.route("/")
    // .get(products.findAll)
    .post(quotes.create)
// .delete(products.deleteAll);

// router.route("/search")
//     .get(products.findByName)
// // router.route("/favorite")
// //     .get(products.findAllFavorite);

router.route("/:userId")
    .get(quotes.findByUserId)
//     .put(products.update)
//     .delete(products.delete);
router.route("/find-by-quote-id/:quoteId")
    .get(quotes.findByQuoteId)
    .delete(quotes.delete)


// router.route("/mshh/:mshh")
//     .get(products.findByMSHH)
module.exports = router;