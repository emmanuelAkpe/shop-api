const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;
  //   console.log(req.headers);
  if (!token) {
    return res.status(403).json({ error: "User not authenticated" });
  }

  const token = tokenWithBearer.split(" ")[1];

  try {
    //   verify if the user is correct
    const user = jwt.verify(token, "star");

    //   attach the user to the req
    req.user = user;
  } catch (error) {
    return res.status(403).json({ error: "User not authenticated" });
  }
  next();
};

module.exports = {
  verifyToken,
};
