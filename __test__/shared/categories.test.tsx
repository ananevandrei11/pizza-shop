import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Categories } from '@/components/shared';

test('Categories', () => {
  render(<Categories />);
  const link = screen.getByText('Pizza');
  expect(link).toBeDefined();
});
