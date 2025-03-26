import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setUploadProgress,
  setError,
  setVideos,
  setEditing,
  setDeleting,
} from "../redux/slices/videoSlice";

export const useVideo = () => {
  const dispatch = useDispatch();
  const { uploadProgress, error, videos, isDeleting, isEditing } = useSelector(
    (state) => state.video
  );

  const { selectedCategory } = useSelector((state) => state.search);

  const uploadVideo = async (videoData) => {
    const formData = new FormData();
    formData.append("title", videoData.title);
    formData.append("description", videoData.description);
    formData.append("thumbnailUrl", videoData.thumbnailUrl);
    formData.append("category", videoData.category);
    formData.append("video", videoData.videoFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/videos/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              dispatch(setUploadProgress(progress));
            }
          },
        }
      );
      return response.data;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to upload video")
      );
      throw error;
    }
  };

  const fetchVideos = async () => {
    try {
      let url = "http://localhost:3000/api/videos";
      if (selectedCategory !== "All") {
        url = `http://localhost:3000/api/videos/category/${selectedCategory}`;
      }
      const response = await axios.get(url);
      dispatch(setVideos(response.data));
    } catch (error) {
      dispatch(setError("Failed to fetch videos"));
    }
  };

  const editVideo = async (videoId, updateData) => {
    dispatch(setEditing(true));
    dispatch(setError(null));
    try {
      await axios.put(
        `http://localhost:3000/api/videos/${videoId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Failed to edit video"));
    } finally {
      dispatch(setEditing(false));
    }
  };

  const deleteVideo = async (videoId) => {
    dispatch(setDeleting(true));
    dispatch(setError(null));
    try {
      await axios.delete(`http://localhost:3000/api/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to delete video")
      );
    } finally {
      dispatch(setDeleting(false));
    }
  };

  return {
    uploadVideo,
    fetchVideos,
    videos,
    uploadProgress,
    error,
    editVideo,
    deleteVideo,
    isEditing,
    isDeleting,
  };
};
