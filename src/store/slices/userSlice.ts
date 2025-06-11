import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSettings {
  emailNotifications: boolean;
  messageNotifications: boolean;
  newsletter: boolean;
  phone: string;
  alternativeEmail: string;
  language: string;
}

interface UserListing {
  id: string;
  title: string;
  price: number;
  status: 'active' | 'pending' | 'sold';
  image: string;
  category: string;
  createdAt: string;
}

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  location: string | null;
  joinDate: string | null;
  settings: UserSettings;
  listings: UserListing[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  avatar: null,
  location: null,
  joinDate: null,
  settings: {
    emailNotifications: true,
    messageNotifications: true,
    newsletter: false,
    phone: '',
    alternativeEmail: '',
    language: 'English',
  },
  listings: [],
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isAuthenticated: true, error: null };
    },
    updateSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setListings: (state, action: PayloadAction<UserListing[]>) => {
      state.listings = action.payload;
    },
    addListing: (state, action: PayloadAction<UserListing>) => {
      state.listings.push(action.payload);
    },
    updateListing: (state, action: PayloadAction<UserListing>) => {
      const index = state.listings.findIndex(listing => listing.id === action.payload.id);
      if (index !== -1) {
        state.listings[index] = action.payload;
      }
    },
    deleteListing: (state, action: PayloadAction<string>) => {
      state.listings = state.listings.filter(listing => listing.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      return { ...initialState };
    },
  },
});

export const {
  setUser,
  updateSettings,
  setListings,
  addListing,
  updateListing,
  deleteListing,
  setLoading,
  setError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
