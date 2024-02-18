import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({
          message: "User already exists!, Please Choose Another Username",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or Password Is Incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Username or Password Is Incorrect" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userID: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    next();
  });
};
