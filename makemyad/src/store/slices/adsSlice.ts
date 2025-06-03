import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Ad } from '../../types';
import { mockAds } from '../../data/mockData';

interface AdsState {
  items: Ad[];
  loading: boolean;
  error: string | null;
  selectedAd: Ad | null;
}

const initialState: AdsState = {
  items: mockAds, // Initialize with mock data
  loading: false,
  error: null,
  selectedAd: null,
};

export const fetchAds = createAsyncThunk(
  'ads/fetchAds',
  async () => {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1000)); // Add 1s delay to simulate network request
    return mockAds;
  }
);

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setSelectedAd: (state, action) => {
      state.selectedAd = action.payload;
    },
    clearSelectedAd: (state) => {
      state.selectedAd = null;
    },
    filterAds: (state, action) => {
      const { category, location, minPrice, maxPrice, sortBy } = action.payload;
      let filteredAds = [...mockAds];

      if (category) {
        filteredAds = filteredAds.filter(ad => ad.category === category);
      }

      if (location) {
        filteredAds = filteredAds.filter(ad =>
          ad.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (minPrice !== undefined) {
        filteredAds = filteredAds.filter(ad => ad.price >= minPrice);
      }

      if (maxPrice !== undefined) {
        filteredAds = filteredAds.filter(ad => ad.price <= maxPrice);
      }

      // Sort the ads
      switch (sortBy) {
        case 'price':
          filteredAds.sort((a, b) => a.price - b.price);
          break;
        case 'date':
          filteredAds.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'relevance':
          // In a real app, this would implement relevance scoring
          break;
      }

      state.items = filteredAds;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ads';
      });
  },
});

export const { setSelectedAd, clearSelectedAd, filterAds } = adsSlice.actions;
export default adsSlice.reducer;
