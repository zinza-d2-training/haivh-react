import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../requestMethod';

export interface ForgotState {
  message: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: ForgotState = {
  message: '',
  status: 'idle',
  loading: false
};

export const forgotPasswordAsync = createAsyncThunk(
  'forgotPassword',
  async (email: Object): Promise<string> => {
    const res = await axiosInstance.post('forgot-password', email);
    return res.data.message;
  }
);

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPasswordAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
