const express = require("express");
const groups = require("../controllers/group.controller");
const router = express.Router();


router.route("/")
    .get(groups.findAll)
    .post(groups.create)
// .post(products.create)
// .delete(products.deleteAll);
// router.route("/find/:bookId")
//     .get(books.findById)
router.route("/:userId")
    .get(groups.findByUserId)

router.route("/member-id/:memberId")
    .get(groups.findByMemberId)

router.route("/group-id/:groupId")
    .get(groups.findByGroupId)
    .put(groups.updateDiscussion)

router.route("/topic/group-id/:groupId&:folderId")
    .put(groups.updateTopic)

router.route("/comment/group-id/:groupId&:folderId&:topicId")
    .put(groups.updateComment)

router.route("/update/group/member/:groupId")
    .put(groups.updateMember)



module.exports = router;