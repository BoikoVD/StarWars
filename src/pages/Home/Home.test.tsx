import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { Home } from './Home';
import * as redux from '../../store/store';


const mockNoDataState = {
  isLoading: false,
  error: null,
  data:  null,
  currentPage: 1,
  totalPages: 1,
}

const mockPersonName = "Person Name";

const mockDataState = {
  isLoading: false,
  error: null,
  data: {
    count: 25,
    next: "string",
    previous: "string",
    results: [{
      "id": 1,
      "name": mockPersonName,
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
  },
  currentPage: 1,
  totalPages: 3,
}

const useSelectorSpy = jest.spyOn(redux, 'useAppSelector');
const useDispatchSpy = jest.spyOn(redux, 'useAppDispatch');
const mockDispatchFn = jest.fn();

describe('Home Page', () => {
  it('Should render with NO people list data', async () => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(mockNoDataState);
    renderWithProviders(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
      {
        route: '/'
      }
    );
    const textMessage = screen.getByText(/No Data/i);
    const prevEl = screen.getByText(/Prev/i);
    const nextEl = screen.getByText(/Next/i);
    expect(textMessage).toBeInTheDocument();
    expect(prevEl).toBeInTheDocument();
    expect(nextEl).toBeInTheDocument();
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('Should render with people list data', async () => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(mockDataState);

    renderWithProviders(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
      {
        route: '/'
      }
    );
    const nameEl = screen.getByText(mockPersonName);
    const prevEl = screen.getByText(/Prev/i);
    const nextEl = screen.getByText(/Next/i);
    expect(nameEl).toBeInTheDocument();
    expect(prevEl).toBeInTheDocument();
    expect(nextEl).toBeInTheDocument();
    expect(mockDispatchFn).toHaveBeenCalled();
  });

  it('Should redirect on click on person name', async () => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useSelectorSpy.mockReturnValue(mockDataState);

    renderWithProviders(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
      {
        route: '/'
      }
    );
    const nameEl = screen.getByText(mockPersonName);
    expect(nameEl).toBeInTheDocument();

    const link = screen.getByRole('link', { name: mockPersonName });
    expect(link).toHaveAttribute('href', `/person/${mockDataState.data.results[0].id}/`);
  });
});