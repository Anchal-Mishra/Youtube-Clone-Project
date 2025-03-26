import express from "express";
import {
  createChannel,
  getChannel,
  updateChannel,
  deleteChannel,
  getUserChannel
} from "../controllers/channelController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createChannel);
router.get("/:channelId", getChannel);
router.get("/user/channel", verifyToken, getUserChannel);
router.put("/:channelId", verifyToken, updateChannel);
router.delete("/:channelId", verifyToken, deleteChannel);

export default router;
