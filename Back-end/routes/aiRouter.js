const express = require("express");
const { uploadResume, getFeedback } = require("../controllers/aicontroller");

const router = express.Router();

router.post("/upload", uploadResume);
router.post("/feedback", getFeedback);

module.exports = router;