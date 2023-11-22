const express = require("express");
const orders = require("../controllers/order.controller");
const router = express.Router();

router.route("/")
    .post(orders.create)
router.route("/mskh")
    .post(orders.findByMSKH)
module.exports = router;