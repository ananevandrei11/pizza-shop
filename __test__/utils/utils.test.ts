import { expect, test } from 'vitest';
import { cn } from '@/lib/utils';

test('Test functions that create class names', () => {
  expect(cn('flex items-center', 'gap-2')).toBe('flex items-center gap-2');
});
