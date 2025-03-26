import { useState } from "react";
import { useChannel } from "../hooks/useChannel";

const ChannelEditModal = ({ channelId, currentName, currentDescription, onClose }) => {
  const { editChannel } = useChannel();
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);

  const handleUpdate = async () => {
    await editChannel(channelId, { channelName: name, description });
    onClose();
  };

  return (
    <div className="fixed p-2 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full sm:w-1/2 lg:w-1/3">
        <h2 className="text-2xl mb-4 text-center">Edit Channel</h2>
        <p className="text-sm">Channel Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b outline-none p-2 w-full mb-4"
          placeholder="Channel Name"
        />
        <p className="text-sm">Channel Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-b p-2 outline-none w-full mb-4"
          placeholder="Channel Description"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-black text-white px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelEditModal;
