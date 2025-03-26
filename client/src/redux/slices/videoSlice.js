import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadProgress: 0,
  error: null,
  videos: [],
  isEditing: false,
  isDeleting: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setDeleting: (state, action) => {
      state.isDeleting = action.payload;
    },
  },
});

export const {
  setUploadProgress,
  setError,
  setVideos,
  setEditing,
  setDeleting,
} = videoSlice.actions;
export default videoSlice.reducer;
