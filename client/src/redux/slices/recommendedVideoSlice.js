import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const recommendedVideosSlice = createSlice({
  name: "recommendedVideos",
  initialState,
  reducers: {
    setRecommendedVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { setRecommendedVideos } = recommendedVideosSlice.actions;
export default recommendedVideosSlice.reducer;