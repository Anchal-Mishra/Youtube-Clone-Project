import axios from "axios";
import { setUserChannel, setChannel, setError } from "../redux/slices/channelSlice";
import { useDispatch, useSelector } from "react-redux";

export const useChannel = () => {
  const dispatch = useDispatch();
  const { userChannel, channel, error } = useSelector((state) => state.channel);

  // Hook for creating a channel
  const createChannel = async (channelData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/channels",
        channelData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setUserChannel(response.data));
      return response.data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Failed to create channel"));
      throw error;
    }
  };

  // Hook to fetch a channel
  const fetchChannel = async (channelId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/channels/${channelId}`);
      dispatch(setChannel(response.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Failed to get channel"));
    }
  };

  // Hook to fetch user-owned channel
  const fetchUserChannel = async () => {
    if (!userChannel) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/channels/user/channel",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          dispatch(setUserChannel(response.data));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          dispatch(setUserChannel(null));
        } else {
          console.error("Error fetching user's channel:", error);
          dispatch(setError(error.response?.data?.message || "Failed to fetch user's channel"));
        }
      }
    }
  };

  // Hook to edit user-owned channel
  const editChannel = async (channelId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/channels/${channelId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setChannel(response.data));
      return response.data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Failed to update channel"));
    }
  };

  // Hook for deleting a channel
  const deleteChannel = async (channelId) => {
    try {
      await axios.delete(`http://localhost:3000/api/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setUserChannel(null));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Failed to delete channel"));
    }
  };

  return {
    createChannel,
    fetchChannel,
    userChannel,
    fetchUserChannel,
    channel,
    editChannel,
    deleteChannel,
    error,
  };
};
