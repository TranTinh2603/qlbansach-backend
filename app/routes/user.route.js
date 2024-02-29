const express = require("express");
const users = require("../controllers/user.controller");
const router = express.Router();

router.route("/")
    .get(users.findAll)
    .post(users.create)

router.route("/email")
    .post(users.findOne)

router.route("/:id")
    .get(users.findById)
    .put(users.update)
    .delete(users.delete)

module.exports = router;