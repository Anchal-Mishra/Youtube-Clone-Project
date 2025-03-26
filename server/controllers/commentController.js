import Video from "../model/Video.js";

export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { commentText } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = {
      userId,
      username,
      commentText,
      timestamp: new Date(),
    };

    video.comments.push(newComment);
    await video.save();

    res.status(201).json({
      message: "Comment added successfully",
      newComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to add comment",
      error,
    });
  }
};

export const getCommentsByVideoId = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId).populate({
      path: "comments.userId",
      select: "username avatar",
    });

    if (!video) {
      return res.status(404).json({ message: "No comments found for this video" });
    }
    res.status(200).json({ comments: video.comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const { commentText } = req.body;

  try {
    const video = await Video.findById(videoId);
    if (!video)
      return res.status(404).json({
        message: "Video not found",
      });
    const comment = video.comments.id(commentId);
    if (!comment)
      return res.status(404).json({
        message: "Comment not found",
      });

    if (comment.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this comment" });
    }
    comment.commentText = commentText;
    comment.timestamp = new Date();

    await video.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update comment",
      error,
    });
  }
};

export const deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this comment." });
    }
    video.comments = video.comments.filter(
      (c) => c._id.toString() !== commentId
    );
    await video.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete comment",
      error,
    });
  }
};