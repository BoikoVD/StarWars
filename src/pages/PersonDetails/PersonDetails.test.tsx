import { render, screen } from '@testing-library/react';
import { PersonDetails } from './PersonDetails';

test('Home page renders', () => {
  render(<PersonDetails />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
