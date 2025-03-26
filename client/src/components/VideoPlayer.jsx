import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import useComment from "../hooks/useComments";

const VideoPlayer = () => {
  const { id: videoId } = useParams();
  const navigate = useNavigate();
  const { video, comments, fetchVideoDetails, isLoading, error } =
    useVideoPlayer(videoId);
  const { addComment } = useComment();
  const [commentText, setCommentText] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const goToChannel = () => {
    if (video?.channelId?._id) {
      navigate(`/channel/${video.channelId._id}`);
    }
  };

  const formatCount = (count) => {
    return count >= 1000 ? (count / 1000).toFixed(1).replace(/\.0$/, "") + "k" : count.toString();
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(videoId, commentText);
    setCommentText("");
  };

  const handleCancelComment = () => {
    setCommentText("");
  };

  return (
    <div className="w-full lg:w-3/4 py-4 sm:px-8 px-2">
      <div className="w-full">
        <div className="w-full h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[40vh] xl:h-[70vh] bg-black rounded-lg">
          <video controls src={video?.videoUrl} className="w-full h-full" />
        </div>
      </div>
      <h2 className="text-2xl font-medium">{video?.title}</h2>
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between md:items-center my-2">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full cursor-pointer"
            src={video?.channelId?.owner?.avatar || "No avatar"}
            alt={video?.channelId?.channelName || "Channel Avatar"}
            onClick={goToChannel}
          />
          <div className="ml-2">
            <h2 onClick={goToChannel} className="text-[14px] cursor-pointer">
              {video?.channelId?.channelName || ""}
            </h2>
            <p className="text-[12px]">
              {video?.channelId?.subscribers ? formatCount(video.channelId.subscribers) : ""} subscribers
            </p>
          </div>
          <button className="bg-black text-white px-2 py-1 ml-6 rounded-full flex items-center gap-2">
            <FaRegBell /> Subscribe
          </button>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-900 text-white px-2 py-1 flex items-center gap-1 rounded-md">
            <BiLike /> {video?.likes}
          </button>
          <button className="bg-zinc-900 text-white px-2 py-1 flex items-center gap-1 rounded-md">
            <BiDislike /> {video?.dislikes}
          </button>
          <button className="bg-zinc-900 text-white px-2 py-1 flex items-center gap-1 rounded-md">
            <PiShareFatLight /> Share
          </button>
          <button className="bg-zinc-900 text-white px-2 py-1 flex items-center gap-1 rounded-md">
            <LiaDownloadSolid /> Download
          </button>
        </div>
      </div>
      <p>
        {video?.views} views • Category: {video?.category}
      </p>
      <p className="text-zinc-700">{video?.description}</p>
      <div className="my-5">
        {isAuthenticated && (
          <div className="my-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border-b outline-none"
            />
            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={handleAddComment}
                className="px-3 py-1 bg-green-500 text-white rounded flex gap-1 items-center"
              >
                <IoMdSend /> Comment
              </button>
              <button
                onClick={handleCancelComment}
                className="px-3 py-1 bg-black text-white rounded flex gap-1 items-center"
              >
                <MdOutlineCancel /> Cancel
              </button>
            </div>
          </div>
        )}

        <div className="my-2">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={comment?.userId?.avatar}
                  alt="user avatar"
                  className="h-8 w-8 rounded-full"
                />
                <div className="my-3">
                  <p className="text-sm text-gray-500 -mb-1">@ {comment.username}</p>
                  <p>{comment.commentText}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
