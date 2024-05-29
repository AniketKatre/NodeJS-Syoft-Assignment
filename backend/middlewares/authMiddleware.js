const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "You are not authorized person or Access Denied" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid OR Login again..." });
    }
  };
};

module.exports = authMiddleware;
