const express = require("express");
const router = express.Router();
const pays = require("../controllers/pay.controller");


router.route("/")
    .post(pays.create);

module.exports = router