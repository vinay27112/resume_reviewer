import jwt from "jsonwebtoken";

import Blacklist from "../models/blacklist.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const isBlacklisted = await Blacklist.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is invalid" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
