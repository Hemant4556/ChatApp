import express from "express";
import { register, login, logout, getOtherUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getOtherUsers);
// router.get("/", getOtherUsers);

export default router;
