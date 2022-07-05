import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstanceWithToken } from '../../requestMethod';

export interface UpdateInfo {
  userInfo: {};
  userId: number;
}

export interface UpdateInfoState {
  value: UpdateInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: UpdateInfoState = {
  value: {
    userInfo: {},
    userId: 0
  },
  status: 'idle',
  loading: false
};

export const updateInfoAsync = createAsyncThunk(
  'user/updateInfo',
  async (info: UpdateInfo) => {
    const { userInfo, userId } = info;
    const res = await axiosInstanceWithToken.patch<UpdateInfo>(
      `users/${userId}`,
      userInfo
    );
    return res.data;
  }
);
export const updateInfoSlice = createSlice({
  name: 'updateInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateInfoAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(updateInfoAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = updateInfoSlice.actions;
export default updateInfoSlice.reducer;
