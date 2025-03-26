import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useVideo } from "../hooks/useVideo"; // Import the custom hook
import VideoPlayer from "../components/VideoPlayer";
import RecommendedVideo from "../components/RecommendedVideo";
import { setRecommendedVideos } from "../redux/slices/recommendedVideoSlice";

const VideoPlayerPage = () => {
  const dispatch = useDispatch();
  const { fetchVideos, videos } = useVideo();
  const recommendedVideos = useSelector((state) => state.recommendedVideo.videos);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    if (videos?.length > 0) {
      dispatch(setRecommendedVideos(videos));
    }
  }, [dispatch, videos]);

  return (
    <div>
      <div className="flex">
        <VideoPlayer />
        <div className="flex flex-col gap-4">
          {recommendedVideos.length > 0 &&
            recommendedVideos.slice(0, 7).map((video) => (
              <RecommendedVideo
                key={video.videoId} // Use videoId as key if it's unique
                videoId={video.videoId}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                views={video.views}
                channelName={video.channelName}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;