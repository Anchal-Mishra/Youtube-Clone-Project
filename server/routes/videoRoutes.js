import express from "express";
import {
  uploadVideo,
  getAllVideos,
  getVideoDetails,
  updateVideo,
  deleteVideo,
  getVideosByCategory,
} from "../controllers/videoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("video"), uploadVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoDetails);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/category/:category", getVideosByCategory);

export default router;
