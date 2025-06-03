import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    // TODO: Replace with actual API call
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
