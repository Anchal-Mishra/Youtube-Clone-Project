import { useVideo } from "../hooks/useVideo";

const VideoDeleteModal = ({ videoId, onClose }) => {
  const { deleteVideo, isDeleting, error } = useVideo();

  const handleDelete = async () => {
    await deleteVideo(videoId);
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg" onClick={handleModalClick}>
        <h2 className="text-2xl mb-4">Delete Video</h2>
        <p>Are you sure you want to delete this video? You will lose all data related to this video.</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDeleteModal;
