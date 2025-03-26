import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: null,
  comments: [],
  isLoading: false,
  error: null,
};

const videoPlayerSlice = createSlice({
  name: "videoPlayer",
  initialState,
  reducers: {
    setVideoLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVideoError: (state, action) => {
      state.error = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload.video;
      state.comments = action.payload.comments;
    },
  },
});

export const { setVideoLoading, setVideoError, setVideo } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
