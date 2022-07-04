import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstanceWithToken } from '../../requestMethod';

export interface UpdateInfo {
  name: string;
  identity_card: string;
  dob: string;
  gender: string;
  province_id: number;
  district_id: number;
  ward_id: number;
}

export interface UpdateInfoState {
  value: UpdateInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: UpdateInfoState = {
  value: {
    name: '',
    identity_card: '',
    dob: '',
    gender: '',
    province_id: 0,
    district_id: 0,
    ward_id: 0
  },
  status: 'idle',
  loading: false
};

export const updateInfoAsync = createAsyncThunk(
  'user/updateInfo',
  async (info: any) => {
    const { userInfo, userId } = info;
    const res = await axiosInstanceWithToken.patch(`users/${userId}`, userInfo);
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
