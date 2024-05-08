const express = require("express");
const images = require("../controllers/image.controller");
const router = express.Router();
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage: storage });

const fileUpload = require("../services/cloudinary.service")
router.route("/upload")
    .post(fileUpload('user').single('image'), images.uploadFile)




module.exports = router;