const express = require("express");
const customers = require("../controllers/customer.controllor");
const router = express.Router();

router.route("/")
    .post(customers.create)

router.route("/email")    
    .post(customers.findOne)

router.route("/:id")
    .get(customers.findById)
    .put(customers.update)

module.exports = router;