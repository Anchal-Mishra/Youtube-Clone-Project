import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  userChannel: null,
  channel: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setUserChannel: (state, action) => {
      const channelData = action.payload;
      if (channelData) {
        state.userChannel = {
          id: channelData._id,
          channelName: channelData.channelName,
          description: channelData.description,
        };
      } else {
        state.userChannel = null;
      }
    },
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserChannel, setChannel, setError } = channelSlice.actions;
export default channelSlice.reducer;
