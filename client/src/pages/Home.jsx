import { useEffect } from "react";
import { useVideo } from "../hooks/useVideo";
import CategoryFilter from "../components/CategoryFilter";
import VideoCard from "../components/VideoCard";
import { useSelector } from "react-redux";

const Home = () => {
  const { fetchVideos, videos, error } = useVideo();
  const { query, selectedCategory } = useSelector((state) => state.search);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos, selectedCategory]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const videosToDisplay = query && query.length > 0 ? filteredVideos : videos;

  return (
    <>
      <div className="max-w-full overflow-hidden my-4 ">
        <div className="flex-1 px-4">
          <CategoryFilter />
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-4">
        {videosToDisplay.length === 0 ? (
          <div className="h-screen w-screen flex items-center justify-center">
            <p className="text-red-500 text-2xl">No videos found related to your search</p>
          </div>
        ) : (
          videosToDisplay.map((video) => (
            <VideoCard
              key={video._id}
              videoId={video._id}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
              views={video.views}
              category={video.category}
              channelName={video.uploader?.username}
              channelId={video.channelId}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
