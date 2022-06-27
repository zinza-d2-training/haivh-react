import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../requestMethod';

export interface UserInfo {
  email: string;
  password: string;
}

export interface VaccineRegistrationInfo {
  insurance: string;
}

export interface UserState {
  value: any;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
  vaccineRegistrationInfo: VaccineRegistrationInfo;
}

const initialState: UserState = {
  value: {
    email: '',
    password: ''
  },
  status: 'idle',
  loading: false,
  vaccineRegistrationInfo: {
    insurance: ''
  }
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginInfo: UserInfo): Promise<UserInfo> => {
    const res = await axiosInstance.post<UserInfo>('/auth/login', loginInfo);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    vaccineRegistration: (
      state,
      action: PayloadAction<VaccineRegistrationInfo>
    ) => {
      state.vaccineRegistrationInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const { vaccineRegistration } = userSlice.actions;
export default userSlice.reducer;
