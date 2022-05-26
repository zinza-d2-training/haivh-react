import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchForgotPass, fetchUser } from './userAPI';

export interface UserInfo {
  email: string;
  password: string;
}
export interface UserState {
  value: UserInfo;
  status: 'idle' | 'loading' | 'failed';
  loading: true | false;
  token: number;
  emailForgot: string;
}

const initialState: UserState = {
  value: {
    email: '',
    password: ''
  },
  status: 'idle',
  loading: false,
  token: 0,
  emailForgot: ''
};

export const loginAsync = createAsyncThunk(
  'user/fetchUser',
  async (info: UserInfo) => {
    const response = await fetchUser(info);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const forgotAsync = createAsyncThunk(
  'user/fetchForgotPass',
  async (emailForgot: string) => {
    const response = await fetchForgotPass(emailForgot);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.value = action.payload;
        state.token = Math.random();
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(forgotAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(forgotAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loading = false;
        state.emailForgot = action.payload;
      })
      .addCase(forgotAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
