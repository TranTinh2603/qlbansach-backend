const express = require("express");
const login = require("../controllers/login.controller");
const router = express.Router();

router.route("/")
    .post(login.findByEmail)
// router.route("/admin")
//     .post(login.findByMSNV)

module.exports = router;