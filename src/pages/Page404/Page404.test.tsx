import { render, screen } from '@testing-library/react';
import { Page404 } from './Page404';

describe('Page 404', () => {
  it('Page renders with message', async () => {
    render(<Page404 />);
    const element = screen.getByText(/404: Not found/i);
    expect(element).toBeInTheDocument();
  });
});