const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authentication");
const {
  requestReceive,
  userConnections,
  feed,
} = require("../controllers/user");
router.get("/user/requests/received", auth, requestReceive);
router.get("/user/connections", auth, userConnections);
router.get("/user/feed?page=1&limit=10", auth, feed);
module.exports = router;
