export const adminAuth = (req,res,next) => {
    console.log("Admin auth is geeting checked!")
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Admin auth is not authorized!");
  } else {
    next();
  }
};
export const userAuth = (req,res,next) => {
    console.log("User auth is geeting checked!")
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("User auth is not authorized!");
  } else {
    next();
  }
};
