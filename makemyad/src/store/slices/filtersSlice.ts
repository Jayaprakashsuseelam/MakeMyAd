import { createSlice } from '@reduxjs/toolkit';
import { SearchFilters } from '../../types';

const initialState: SearchFilters = {
  category: undefined,
  location: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: 'date',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const {
  setCategory,
  setLocation,
  setPriceRange,
  setSortBy,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
