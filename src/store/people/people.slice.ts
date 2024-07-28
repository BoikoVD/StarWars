import { createSlice, UnknownAction, PayloadAction } from '@reduxjs/toolkit';
import { PeopleResponseModel } from '../types';
import { fetchPeople } from './people.thunk';

export interface PeopleState {
  isLoading: boolean,
  error: string | null,
  data: PeopleResponseModel | null,
  currentPage: number,
  totalPages: number,
};

const initialState: PeopleState = {
  isLoading: false,
  error: null,
  data: null,
  currentPage: 1,
  totalPages: 1,
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
        state.data = action.payload.data;
        if (action.payload.page) {
          state.currentPage = action.payload.page;
        } else {
          state.currentPage = 1;
        }
        state.totalPages = Math.ceil(action.payload.data.count / 10);
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