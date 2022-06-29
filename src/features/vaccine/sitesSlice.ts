import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../requestMethod';

export interface SiteInfo {
  id: number;
  name: string;
  address: string;
  manager: string;
  number_table: number;
}

export interface SiteState {
  value: SiteInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
  error: any;
}

const initialState: SiteState = {
  value: {
    id: 0,
    name: '',
    address: '',
    manager: '',
    number_table: 0
  },
  status: 'idle',
  loading: false,
  error: ''
};

export const updateSiteAsync = createAsyncThunk(
  'vaccine/update',
  async (updateInfo: SiteInfo) => {
    try {
      const res = await axiosInstance.patch(
        `/vaccination-sites/${updateInfo.id}`,
        updateInfo
      );
      return res.data;
    } catch (err: any) {
      return err;
    }
  }
);

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSiteAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateSiteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(updateSiteAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {} = siteSlice.actions;
export default siteSlice.reducer;
