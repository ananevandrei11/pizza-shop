import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui';

test('Button variant=outline size=lg', () => {
  const res = render(
    <Button variant="outline" size="lg" type="button">
      Button
    </Button>,
  );
  const btn = screen.getByRole('button');
  expect(btn).toBeDefined();
  // @ts-ignore
  const classNames = res.container.firstChild?.className;
  expect(classNames).toContain('h-11 rounded-md px-8');
});
