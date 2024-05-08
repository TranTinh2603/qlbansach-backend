const express = require("express");
const orders = require("../controllers/order.controller");
const router = express.Router();

router.route("/")
    .get(orders.findAll)
    .post(orders.create)
// router.route("/mskh")
//     .post(orders.findByMSKH)
router.route("/:orderId")
    .get(orders.findByOrderId)
//     .put(orders.update)
// router.route("/id/:id")
//     .delete(orders.delete)
module.exports = router;