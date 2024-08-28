import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Categories } from '@/shared/components/shared';

test('Categories', () => {
  render(<Categories items={[]} />);
  const link = screen.getByText('Pizza');
  expect(link).toBeDefined();
});
