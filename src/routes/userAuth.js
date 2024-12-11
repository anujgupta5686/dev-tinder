const express = require("express");
const router = express.Router();
const {auth}=require("../middlewares/authentication");
const { signup, login } = require('../controllers/userAuth');
const { feed, getUser, updateUser, deleteUser } = require('../controllers/user');

router.post("/signup",signup);
router.post("/login",login);
router.get("/feed",feed);
router.get("/user",auth,getUser);
router.put("/user",auth,updateUser);
router.delete("/user",auth,deleteUser);
module.exports = router ;