import { createSlice, UnknownAction, PayloadAction } from '@reduxjs/toolkit';
import { FilmModel, PersonModel, StarshipModel } from '../types';
import { fetchPersonData } from './person.thunk';

export interface PersonState {
  isLoading: boolean,
  error: string | null,
  personData: PersonModel | null,
  filmsData: FilmModel[] | null,
  starshipsData: StarshipModel[] | null,
};

const initialState: PersonState = {
  isLoading: false,
  error: null,
  personData: null,
  filmsData: null,
  starshipsData: null,
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonData.fulfilled, (state, action) => {
        state.personData = action.payload.personData;
        state.filmsData = action.payload.filmsData.results;
        state.starshipsData = action.payload.starshipsData.results;
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

export default personSlice.reducer;