import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useChannel } from "../hooks/useChannel";
import { useSelector } from "react-redux";
import { FaRegBell } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import ChannelEditModal from "../components/ChannelEditModal";
import ChannelDeleteModal from "../components/ChannelDeleteModal";
import { RiVideoUploadFill } from "react-icons/ri";

const ChannelPage = () => {
  const { id: channelId } = useParams();
  const { channel, fetchChannel, deleteChannel } = useChannel();
  const { user } = useSelector((state) => state.auth);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (channelId) {
      fetchChannel(channelId);
    }
  }, [channelId, fetchChannel]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (channelId) {
      await deleteChannel(channelId);
      setIsDeleteModalOpen(false);
      navigate("/");
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="px-8">
      <div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-zinc-600 p-3 text-zinc-100 rounded-lg">
          <img
            src={channel?.owner?.avatar}
            alt={`${channel?.channelName} avatar`}
            className="w-[20vw] h-[20vw] rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold mt-4 ml-3 capitalize text-center sm:text-left">
              {channel?.channelName}
            </h1>
            <div>
              <div className="flex flex-col sm:flex-row items-center">
                <h2 className="text-xl ml-3 text-gray-400 lowercase">
                  @{channel?.channelName}
                </h2>
                <p className="text-sm ml-3 text-gray-400">
                  {channel?.subscribers} subscribers
                </p>
              </div>
              <p className="sm:text-lg mt-1 sm:mt-3 ml-3 w-full overflow-hidden">
                {channel?.description}
              </p>
              {channel?.owner?._id !== user?.id && (
                <button className="bg-blue-500 mt-4 ml-3 text-white px-4 py-2 rounded-md hover:opacity-70 transition-all duration-300 ease-linear flex items-center gap-1">
                  <FaRegBell /> Subscribe
                </button>
              )}
            </div>
            {channel?.owner?._id === user?.id && (
              <div>
                <div className="flex mt-4 ml-3 gap-4">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 px-2 py-1 text-white rounded-md hover:opacity-70 transition-all duration-300 ease-linear flex items-center gap-1"
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 px-2 py-1 text-white rounded-md hover:opacity-70 transition-all duration-300 ease-linear flex items-center gap-1"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
                <div className="flex mt-4 ml-3 gap-4">
                  <Link
                    to="/video-upload"
                    className="bg-green-500 px-4 rounded-md py-2 flex items-center gap-1"
                  >
                    <RiVideoUploadFill /> Upload Video
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-b my-5">
        <p className="text-2xl mx-2 text-center sm:text-left">Videos</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
        {channel?.videos?.map((video) => (
          <VideoCard
            key={video._id}
            videoId={video._id}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            views={video.views}
            category={video.category}
            channelId={channelId}
            isOwner={channel?.owner?._id === user?.id}
          />
        ))}
      </div>
      {isEditModalOpen && channelId && (
        <ChannelEditModal
          channelId={channelId}
          currentName={channel?.channelName || ""}
          currentDescription={channel?.description || ""}
          onClose={handleCloseModal}
        />
      )}
      {isDeleteModalOpen && (
        <ChannelDeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </div>
  );
};

export default ChannelPage;
