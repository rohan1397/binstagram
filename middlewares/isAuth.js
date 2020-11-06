const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const auth_headers = req.headers.authorization;
  if (auth_headers) {
    const token = auth_headers.split(" ")[1];
    if (token) {
      try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
          if (!error) {
            req.user = user;
            next();
          } else {
            res.status(403).json({ message: "User not authenticated" });
          }
        });
      } catch (e) {
        res.status(403).json({ message: "User not authenticated" });
      }
    }
  } else {
    res.status(403).json({ message: "Authorization Header Not Found" });
  }
};
module.exports = isAuth;
