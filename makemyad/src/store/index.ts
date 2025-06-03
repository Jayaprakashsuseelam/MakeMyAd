import { configureStore } from '@reduxjs/toolkit';
import adsReducer from './slices/adsSlice';
import userReducer from './slices/userSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    ads: adsReducer,
    user: userReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
