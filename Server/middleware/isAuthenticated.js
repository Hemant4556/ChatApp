import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Decode the token synchronously
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach userId to the request object
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error, could not authenticate token." });
  }
};

export default isAuthenticated;