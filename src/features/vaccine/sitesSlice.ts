import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../requestMethod';

export interface SiteInfo {
  name: string;
  address: string;
  manager: string;
  number_table: number;
  ward_id: number;
}

export interface SiteState {
  value: SiteInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
  error: any;
}

const initialState: SiteState = {
  value: {
    name: '',
    address: '',
    manager: '',
    number_table: 0,
    ward_id: 0
  },
  status: 'idle',
  loading: false,
  error: ''
};

export const listVaccinationSiteAsync = createAsyncThunk('list', async () => {
  try {
    const res = await axiosInstance.get('/vaccination-sites');
    return res.data;
  } catch (err: any) {
    return err;
  }
});

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listVaccinationSiteAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(listVaccinationSiteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(listVaccinationSiteAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {} = siteSlice.actions;
export default siteSlice.reducer;
