import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from './userAPI';
export interface UserState {
  value: object;
  status: 'idle' | 'loading' | 'failed';
  loading: true | false;
  token: number;
}

const initialState: UserState = {
  value: {},
  status: 'idle',
  loading: false,
  token: Math.random()
};

export const incrementAsync = createAsyncThunk(
  'user/fetchUser',
  async (info: object) => {
    const response = await fetchUser(info);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
