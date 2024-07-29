import { screen } from '@testing-library/react';
import { PersonDetails } from './PersonDetails';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import * as redux from '../../store/store';

const mockPersonId = 1;

const mockLoadingState = {
  isLoading: true,
  error: null,
  personData: null,
  filmsData: null,
  starshipsData: null,
}

const mockNoDataState = {
  isLoading: false,
  error: null,
  personData: null,
  filmsData: null,
  starshipsData: null,
}

const mockPersonName = "Person Name";
const mockFilmName = "Film Name";
const mockStarshipName = "Starship Name";
const mockDataState = {
  isLoading: false,
  error: null,
  personData: {
    "id": mockPersonId,
    "name": mockPersonName,
    "height": "string",
    "mass": "string",
    "hair_color": "string",
    "skin_color": "string",
    "eye_color": "string",
    "birth_year": "string",
    "gender": "male",
    "homeworld": 1,
    "films": [1,12],
    "species": [1,2],
    "vehicles": [1,2],
    "starships": [1,3],
    "created": "string",
    "edited": "string",
    "url": "string"
  },
  filmsData: [{
    "id": 12,
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
    "starships": [1,3],
    "title": mockFilmName,
    "url": "string",
    "vehicles": [1,2]
  }],
  starshipsData: [{
    "id": 3,
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
    "name": mockStarshipName,
    "passengers": "string",
    "films": [1,12],
    "pilots": [1,2],
    "starship_class": "string",
    "url": "string"
  }],
}

const useSelectorSpy = jest.spyOn(redux, 'useAppSelector');
const useDispatchSpy = jest.spyOn(redux, 'useAppDispatch');
const mockDispatchFn = jest.fn();

describe('Person Page', () => {
  it('Page renders with loading state', async () => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(mockLoadingState);
    renderWithProviders(
      <Routes>
        <Route path={"/person/" + mockPersonId} element={<PersonDetails />} />
      </Routes>,
      {
        route: "/person/" + mockPersonId
      }
    );
    const element = screen.getByText(/Loading/i);
    expect(element).toBeInTheDocument();
  });

  it('Page renders withot details data', async () => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(mockNoDataState);
    renderWithProviders(
      <Routes>
        <Route path={"/person/" + mockPersonId} element={<PersonDetails />} />
      </Routes>,
      {
        route: "/person/" + mockPersonId
      }
    );
    const element = screen.getByText(/No Data/i);
    expect(element).toBeInTheDocument();
  });

  it('Page renders with details data', async () => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(mockDataState);
    renderWithProviders(
      <Routes>
        <Route path={"/person/" + mockPersonId} element={<PersonDetails />} />
      </Routes>,
      {
        route: "/person/" + mockPersonId
      }
    );
    const person = screen.getByText(mockPersonName);
    const film = screen.getByText(mockFilmName);
    const starship = screen.getByText(mockStarshipName);
    expect(person).toBeInTheDocument();
    expect(film).toBeInTheDocument();
    expect(starship).toBeInTheDocument();
  });
});