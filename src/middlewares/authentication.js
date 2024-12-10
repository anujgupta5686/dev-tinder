const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    try{
      const decode=jwt.verify(token,secret_key);
      req.user = decode;
      next();
    }catch(err){
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    
    return res
      .status(500)
      .json({ message: "Something went wrong in authentication middleware." });
  }
};

module.exports = auth;
