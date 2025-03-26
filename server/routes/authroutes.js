import express from "express";
import { registeredUser, loginUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registeredUser);
router.post("/login", loginUser);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "User profile accessed", userId: req.user.id });
});

export default router;
