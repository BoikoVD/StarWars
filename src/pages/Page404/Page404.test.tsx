import { render, screen } from '@testing-library/react';
import { Page404 } from './Page404';

test('Page 404 renders', () => {
  render(<Page404 />);
  const element = screen.getByText(/404: Not found/i);
  expect(element).toBeInTheDocument();
});
