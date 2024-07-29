import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPersonData } from './person.thunk';
import api from '../../utils/api';

var mock = new MockAdapter(axios);

const mockId = 2;
const mockPersonData = {
  "id": 2,
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
}
const mockFilmsData = {
  count: 5,
  next: "string",
  previous: "string",
  results: [{
    "id": 1,
    "characters": [1,2],
    "created": "string",
    "director": "string",
    "edited": "string",
    "episode_id": 4,
    "opening_crawl": "string",
    "planets": [1,2],
    "producer": "string",
    "release_date": "string",
    "species": [1,2],
    "starships": [1,2],
    "title": "string",
    "url": "string",
    "vehicles": [1,2]
  }]
}
const mockStarshipsData = {
  count: 5,
  next: "string",
  previous: "string",
  results: [{
    "id": 1,
    "MGLT": "string",
    "cargo_capacity": "string",
    "consumables": "string",
    "cost_in_credits": "string",
    "created": "string",
    "crew": "string",
    "edited": "string",
    "hyperdrive_rating": "string",
    "length": "string",
    "manufacturer": "string",
    "max_atmosphering_speed": "string",
    "model": "string",
    "name": "string",
    "passengers": "string",
    "films": [1,2],
    "pilots": [1,2],
    "starship_class": "string",
    "url": "string"
  }]
}

describe('FetchPersonData Thunk', () => {
  it('Should fetch person data with resolved response', async () => {
    mock.onGet(api.people.getById(mockId)).reply(200, mockPersonData);
    mock.onGet(api.films.getByCharacterId(mockId)).reply(200, mockFilmsData);
    mock.onGet(api.starships.getByCharacterId(mockId)).reply(200, mockStarshipsData);

    const dispatch = jest.fn();
    const thunk = fetchPersonData(mockId);

    await thunk(dispatch, () => ({}), () => ({}));

    const { calls } = dispatch.mock
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchPersonData.pending.type);
    expect(end[0].type).toBe(fetchPersonData.fulfilled.type);
    expect(end[0].payload).toStrictEqual({ personData: mockPersonData, filmsData: mockFilmsData, starshipsData: mockStarshipsData});
  });

  it('Should fetch person data with rejected response', async () => {
    mock.onGet(api.people.getById(mockId)).reply(200, mockPersonData);
    mock.onGet(api.films.getByCharacterId(mockId)).reply(200, mockFilmsData);
    mock.onGet(api.starships.getByCharacterId(mockId)).reply(404);

    const dispatch = jest.fn();
    const thunk = fetchPersonData(mockId);

    await thunk(dispatch, () => ({}), () => ({}));

    const { calls } = dispatch.mock
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    console.log(end);

    expect(start[0].type).toBe(fetchPersonData.pending.type);
    expect(end[0].type).toBe(fetchPersonData.rejected.type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
    expect(typeof end[0].payload).toBe("string");
  });
});