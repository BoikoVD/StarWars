import { render, screen } from '@testing-library/react';
import { Home } from './Home';

test('Home page renders', () => {
  render(<Home />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
