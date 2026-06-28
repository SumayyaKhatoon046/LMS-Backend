const express = require("express");
const router = express.Router();


const protect = require("../middleware/authMiddleware");


const {
    generateCertificate,
    getMyCertificates
} = require("../controllers/certificateController");



router.post(
    "/generate",
    protect,
    generateCertificate
);


router.get(
    "/my-certificates",
    protect,
    getMyCertificates
);



module.exports = router;