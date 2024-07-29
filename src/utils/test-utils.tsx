import React, { PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import peopleReducer from '../store/people/people.slice';
import personReducer from '../store/person/person.slice';

const createTestStore = (preloadedState?: {}) => {
  return configureStore({
    reducer: {
      people: peopleReducer,
      person: personReducer,
    },
    preloadedState
  });
};

const renderWithProviders = (
    ui: React.ReactElement, 
    { 
      preloadedState = {}, 
      store = createTestStore(preloadedState), 
      route = '/', 
      ...renderOptions 
    } = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren) => <Provider store={store}><MemoryRouter initialEntries={[route]}>{children}</MemoryRouter></Provider>;

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithProviders, createTestStore };