import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: object;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: {},
  status: 'idle'
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export const {} = userSlice.actions;
