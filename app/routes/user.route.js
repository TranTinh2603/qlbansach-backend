const express = require("express");
const users = require("../controllers/user.controller");
const router = express.Router();

const fileUpload = require("../services/cloudinary.service")
router.route("/upload")
    .post(fileUpload('user').single('image'), users.updateImage)

router.route("/")
    .get(users.findAll)
// .post(users.create)

// router.route("/email")
//     .post(users.findOne)

router.route("/update/:userId")
    .put(users.updateUser)

router.route("/:userId")
    .get(users.findByUserId)
    .put(users.updateFridends)
//     .delete(users.delete)
router.route("/find-by-email/:email")
    .get(users.findByEmail)

router.route("/find/:searchText")
    .get(users.findByEmailOrName)
module.exports = router;