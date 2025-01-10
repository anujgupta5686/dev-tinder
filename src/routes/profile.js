const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authentication");
const {
  profiles,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/profile");

router.get("/profiles/view", profiles);
router.get("/user", auth, getUser);
router.put("/user", auth, updateUser);
router.delete("/user", auth, deleteUser);
module.exports = router;
