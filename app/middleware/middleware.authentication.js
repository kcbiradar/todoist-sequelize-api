const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  let token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Invalid token" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return response
        .status(401)
        .json({ message: "Failed to authenticate" });
    }

    request.user = decoded;
    next();
  });
};

module.exports = verifyToken;
