import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  filteredVideos: [],
  selectedCategory: "All",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilteredVideos: (state, action) => {
      state.filteredVideos = action.payload;
    },
    setCategoryFilter(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setQuery, setFilteredVideos, setCategoryFilter } = searchSlice.actions;

export default searchSlice.reducer;
