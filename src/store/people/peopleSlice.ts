import { createSlice, UnknownAction, PayloadAction } from '@reduxjs/toolkit';
import { PeopleResponseModel } from '../types';
import { fetchPeople } from './peopleThunk';

export interface PeopleState {
  isLoading: boolean,
  error: string | null,
  data: PeopleResponseModel | null,
};

const initialState: PeopleState = {
  isLoading: false,
  error: null,
  data: null,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith('rejected');
        },
        (state, action: PayloadAction<string>) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      )
  },
});

export default peopleSlice.reducer;