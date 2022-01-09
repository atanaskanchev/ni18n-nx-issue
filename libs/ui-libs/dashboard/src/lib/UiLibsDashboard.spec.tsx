import { render } from '@testing-library/react';

import UiLibsDashboard from './UiLibsDashboard';

describe('UiLibsDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiLibsDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
