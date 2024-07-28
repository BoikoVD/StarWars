import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';
import { ErrorModel, PeopleResponseModel } from '../types'; 

export const fetchPeople = createAsyncThunk<{data: PeopleResponseModel, page: number | undefined}, number | undefined, {rejectValue: string}>(
    'people/fetchPeople',
    async function (page, { rejectWithValue }) {
        try {
            const url = page ? api.people.getByPage(page) : api.people.get()
            const response = await axios.get(url);

            if (!response.data) {
                throw new Error('No data!');
            }

            return {
                data: response.data,
                page: page
            };
        } catch (e: unknown) {
            const error = e as ErrorModel;
            return rejectWithValue(error?.message ?? 'Something went wrong...');
        }
    }
);