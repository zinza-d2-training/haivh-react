import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstanceWithToken } from '../../requestMethod';

// export interface UpdatePassword {
//  password: string;
// }

export interface UpdatePasswordState {
  password: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: UpdatePasswordState = {
  password: '',
  status: 'idle',
  loading: false
};

export const updatePasswordAsync = createAsyncThunk(
  'user/updatePassword',
  async (info: any) => {
    const { password, userId } = info;
    const res = await axiosInstanceWithToken.patch(`users/${userId}`, {
      password
    });
    return res.data;
  }
);
export const updatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.password = action.payload;
      })
      .addCase(updatePasswordAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;
