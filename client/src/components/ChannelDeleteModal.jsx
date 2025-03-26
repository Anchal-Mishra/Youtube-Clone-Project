const ChannelDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 p-3 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl mb-4 font-semibold">Delete Channel</h2>
        <p>
          Are you sure you want to delete this channel? All data related to this channel will be lost.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-black text-white px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelDeleteModal;
