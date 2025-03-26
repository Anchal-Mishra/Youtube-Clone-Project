import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setVideo,
  setVideoLoading,
  setVideoError,
} from "../redux/slices/videoPlayerSlice";

export const useVideoPlayer = (videoId) => {
  const dispatch = useDispatch();

  const { video, comments, isLoading, error } = useSelector(
    (state) => state.videoPlayer
  );

  const fetchVideoDetails = async () => {
    dispatch(setVideoLoading(true));
    try {
      const videoResponse = await axios.get(
        `http://localhost:3000/api/videos/${videoId}`
      );
      const { video } = videoResponse.data;

      const commentsResponse = await axios.get(
        `http://localhost:3000/api/comments/${videoId}`
      );
      const { comments } = commentsResponse.data;

      dispatch(setVideo({ video, comments }));
    } catch (error) {
      dispatch(
        setVideoError(error.response?.data?.message || "Failed to fetch video")
      );
    } finally {
      dispatch(setVideoLoading(false));
    }
  };

  return { video, comments, fetchVideoDetails, isLoading, error };
};
