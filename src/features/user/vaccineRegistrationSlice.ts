import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstanceWithToken } from '../../requestMethod';

export interface VaccineRegistrationInfo {
  id: number;
  user_id: number;
  group_id: number;
  health_insurance: string;
  occupation: string;
  work_place: string;
  address: string;
  expected_date: Date | string;
  session: string;
}

export interface VaccineRegistrationState {
  vaccineRegistrationInfo: VaccineRegistrationInfo;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: VaccineRegistrationState = {
  vaccineRegistrationInfo: {
    id: 0,
    user_id: 0,
    group_id: 0,
    health_insurance: '',
    occupation: '',
    work_place: '',
    address: '',
    expected_date: '',
    session: ''
  },
  status: 'idle',
  loading: false
};

export const vaccineRegistrationAsync = createAsyncThunk(
  'user/vaccine-registration',
  async (data: VaccineRegistrationInfo) => {
    const res = await axiosInstanceWithToken.post<VaccineRegistrationInfo>(
      'vaccine-registrations',
      data
    );
    return res.data;
  }
);
export const vaccineRegistrationSlice = createSlice({
  name: 'vaccineRegistration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vaccineRegistrationAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(vaccineRegistrationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.vaccineRegistrationInfo = action.payload;
      })
      .addCase(vaccineRegistrationAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = vaccineRegistrationSlice.actions;
export default vaccineRegistrationSlice.reducer;
