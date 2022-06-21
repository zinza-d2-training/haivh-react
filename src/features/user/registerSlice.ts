import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { publicRequest } from '../../requestMethod';

export interface RegisterInfo {
  identity_card: string;
  email: string;
  password: string;
  name: string;
  dob: Date | string;
  gender: string;
  ward_id: number | string;
  role_id: number | string;
}

export interface RegisterState {
  value: any;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: RegisterState = {
  value: {
    identity_card: '',
    email: '',
    password: '',
    name: '',
    dob: '',
    gender: '',
    ward_id: 0,
    role_id: 0
  },
  status: 'idle',
  loading: false
};

export const registerAsync = createAsyncThunk(
  'register',
  async (registerInfo: RegisterInfo) => {
    const res = await publicRequest.post('/auth/register', registerInfo);
    return res.data;
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = registerSlice.actions;
export default registerSlice.reducer;
