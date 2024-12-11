const express = require("express");
const router = express.Router();
const {auth}=require("../middlewares/authentication");
const { connectionRequest } = require("../controllers/connectionRequest");

router.post("/request/send/:status/:toUserId",auth,connectionRequest);
module.exports = router ;