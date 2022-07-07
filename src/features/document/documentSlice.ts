import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstanceWithToken } from '../../requestMethod';

export interface DocumentInfo {
  id: number;
  description: string;
  link: string;
}

export interface SiteState {
  value: DocumentInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
  error: any;
}

const initialState: SiteState = {
  value: {
    id: 0,
    description: '',
    link: ''
  },
  status: 'idle',
  loading: false,
  error: ''
};

export const updateDocumentAsync = createAsyncThunk(
  'document/update',
  async (updateInfo: DocumentInfo) => {
    try {
      const res = await axiosInstanceWithToken.patch<DocumentInfo>(
        `/documents/${updateInfo.id}`,
        updateInfo
      );
      return res.data;
    } catch (err: any) {
      return err;
    }
  }
);

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDocumentAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateDocumentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(updateDocumentAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {} = documentSlice.actions;
export default documentSlice.reducer;
