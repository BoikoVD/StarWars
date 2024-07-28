import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';
import { ErrorModel, FilmsResponseModel, PersonModel, StarshipsResponseModel } from '../types'; 

interface FetchPersonDataThunkResponse {
    personData: PersonModel,
    filmsData: FilmsResponseModel,
    starshipsData: StarshipsResponseModel,
}

export const fetchPersonData = createAsyncThunk<FetchPersonDataThunkResponse, number, {rejectValue: string}>(
    'person/fetchPersonData',
    async function (id, { rejectWithValue }) {
        try {
            const personResponse = await axios.get(api.people.getById(id));
            const filmsResponse = await axios.get(api.films.getByCharacterId(id));
            const starshipsResponse = await axios.get(api.starships.getByCharacterId(id));

            if (!personResponse.data) throw new Error('No person data!');
            if (!filmsResponse.data) throw new Error('No films data!');
            if (!starshipsResponse.data) throw new Error('No starships data!');

            return {
                personData: personResponse.data,
                filmsData: filmsResponse.data,
                starshipsData: starshipsResponse.data,
            };
        } catch (e: unknown) {
            const error = e as ErrorModel;
            return rejectWithValue(error?.message ?? 'Something went wrong...');
        }
    }
);