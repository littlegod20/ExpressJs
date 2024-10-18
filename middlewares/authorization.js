const jwt = require("jsonwebtoken");

function authorizationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ msg: "Unauthorized, Access denied" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Token has expired." });
    }
    req.user = user;
    next();
  });
}

module.exports = authorizationToken;
