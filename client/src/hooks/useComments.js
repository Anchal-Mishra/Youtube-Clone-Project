import axios from "axios";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/slices/commentSlice";

const useComment = () => {
  const dispatch = useDispatch();

  // Hook for adding a comment
  const addCommentHandler = async (videoId, commentText) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/comments/${videoId}`,
        { commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addComment({ videoId, comment: response.data }));
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  return { addComment: addCommentHandler };
};

export default useComment;
