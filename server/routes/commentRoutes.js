import express from "express";
import {
  addComment,
  updateComment,
  deleteComment,
  getCommentsByVideoId,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:videoId", verifyToken, addComment);
router.get("/:videoId", getCommentsByVideoId);
router.put("/:videoId/:commentId", verifyToken, updateComment);
router.delete("/:videoId/:commentId", verifyToken, deleteComment);

export default router;
