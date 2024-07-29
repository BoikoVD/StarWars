import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPeople } from './people.thunk';
import api from '../../utils/api';

var mock = new MockAdapter(axios);

const mockPage = 3;
const mockData = {
  count: 5,
  next: "string",
  previous: "string",
  results: [{
    "id": 1,
    "name": "string",
    "height": "string",
    "mass": "string",
    "hair_color": "string",
    "skin_color": "string",
    "eye_color": "string",
    "birth_year": "string",
    "gender": "male",
    "homeworld": 1,
    "films": [1,2],
    "species": [1,2],
    "vehicles": [1,2],
    "starships": [1,2],
    "created": "string",
    "edited": "string",
    "url": "string"
  }]
}

describe('FetchPeople Thunk', () => {
  it('Should fetch people with resolved response', async () => {
    mock.onGet(api.people.get()).reply(200, mockData);

    const dispatch = jest.fn();
    const thunk = fetchPeople();

    await thunk(dispatch, () => ({}), () => ({}));

    const { calls } = dispatch.mock
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchPeople.pending.type);
    expect(end[0].type).toBe(fetchPeople.fulfilled.type);
    expect(end[0].payload).toStrictEqual({ data: mockData, page: undefined });
  });

  it('Should fetch people with rejected response', async () => {
    mock.onGet(api.people.get()).reply(404);

    const dispatch = jest.fn();
    const thunk = fetchPeople();

    await thunk(dispatch, () => ({}), () => ({}));

    const { calls } = dispatch.mock
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    console.log(end);

    expect(start[0].type).toBe(fetchPeople.pending.type);
    expect(end[0].type).toBe(fetchPeople.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
    expect(typeof end[0].payload).toBe("string");
  });

  it('Should fetch people BY PAGE with resolved response', async () => {
    mock.onGet(api.people.getByPage(mockPage)).reply(200, mockData);

    const dispatch = jest.fn();
    const thunk = fetchPeople(mockPage);

    await thunk(dispatch, () => ({}), () => ({}));

    const { calls } = dispatch.mock
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchPeople.pending.type);
    expect(end[0].type).toBe(fetchPeople.fulfilled.type);
    expect(end[0].payload).toStrictEqual({ data: mockData, page: mockPage });
  });

  it('Should fetch people BY PAGE with rejected response', async () => {
    mock.onGet(api.people.getByPage(mockPage)).reply(404);

    const dispatch = jest.fn();
    const thunk = fetchPeople();

    await thunk(dispatch, () => ({}), () => ({}));

    const { calls } = dispatch.mock
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    console.log(end);

    expect(start[0].type).toBe(fetchPeople.pending.type);
    expect(end[0].type).toBe(fetchPeople.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
    expect(typeof end[0].payload).toBe("string");
  });
});