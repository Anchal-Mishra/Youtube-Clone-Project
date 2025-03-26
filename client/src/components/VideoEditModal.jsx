import { useState } from "react";
import { useVideo } from "../hooks/useVideo";

const VideoEditModal = ({ videoId, currentTitle, currentDescription, currentThumbnailUrl, onClose }) => {
  const { editVideo, isEditing, error } = useVideo();
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);
  const [thumbnailUrl, setThumbnailUrl] = useState(currentThumbnailUrl);

  const handleUpdate = async () => {
    await editVideo(videoId, { title, description, thumbnailUrl });
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="px-3 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg w-full sm:w-1/2 lg:w-1/3" onClick={handleModalClick}>
        <h2 className="text-2xl mb-4 text-center">Edit Video</h2>
        
        <p className="text-sm">Video Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-b outline-none p-2 w-full mb-4"
          placeholder="Title"
        />
        
        <p className="text-sm">Video Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-b p-2 outline-none w-full mb-4"
          placeholder="Description"
        />
        
        <p className="text-sm">Thumbnail URL</p>
        <input
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="border-b p-2 outline-none w-full mb-4"
          placeholder="Thumbnail URL"
        />
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="flex justify-end gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate();
            }}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
            disabled={isEditing}
          >
            {isEditing ? "Updating..." : "Update"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="bg-black text-white px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoEditModal;
