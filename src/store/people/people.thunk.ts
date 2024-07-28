import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';
import { ErrorModel, PeopleResponseModel } from '../types';

export const fetchPeople = createAsyncThunk<PeopleResponseModel, undefined, {rejectValue: string}>(
    'people/fetchPeople',
    async function (_, { rejectWithValue }) {
        try {
            const response = await axios.get(api.people.get);

            if (!response.data) {
                throw new Error('No data!');
            }

            return response.data;
        } catch (e: unknown) {
            const error = e as ErrorModel;
            return rejectWithValue(error?.message ?? 'Something went wrong...');
        }
    }
);