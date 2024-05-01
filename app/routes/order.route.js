const express = require("express");
const orders = require("../controllers/order.controller");
const router = express.Router();

router.route("/")
    .get(orders.findAll)
// router.route("/mskh")
//     .post(orders.findByMSKH)
// router.route("/:msdh")
//     .get(orders.findOne)
//     .put(orders.update)
// router.route("/id/:id")
//     .delete(orders.delete)
module.exports = router;