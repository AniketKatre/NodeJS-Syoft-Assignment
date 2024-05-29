const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    // const token = headerObj?.authorization?.split(" ")[1];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Token not provided" });
    }

    //TOKEN
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token not provided in..." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (roles.length && !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied or you arenot authorized" });
    }
    next();
  };
};

module.exports = authMiddleware;
