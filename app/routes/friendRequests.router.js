const express = require("express");
const friendRequests = require("../controllers/friendRequests.controller");
const router = express.Router();


router.route("/")
    .get(friendRequests.findAll)
    .post(friendRequests.create)
// .delete(products.deleteAll);
// router.route("/find/:bookId")
//     .get(books.findById)

router.route("/:senderId&:receiverId")
    .get(friendRequests.findBySenderIdAndReceiverId)
    .put(friendRequests.updateStatus)
    .delete(friendRequests.delete)

router.route("/find-by-receiver-id/:receiverId")
    .get(friendRequests.findByReceiverId)

module.exports = router;