import jwt from "jsonwebtoken";
import TokenBlackList from "../model/TokenBlackList.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const blacklisted = await TokenBlackList.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // Store the decoded payload with role in req.user
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message === 'jwt expired' ? 'Token expired' : error.message,
    });
  }
};