'use client';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';

interface Props {
  initPrices: number[];
  updateInitPrices: (value: number[]) => void;
  className?: string;
}

export const RangePrices = ({ initPrices, updateInitPrices, className }: Props) => {
  const [prices, setPrices] = useState<number[]>(initPrices);
  const updateOnePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
      const value = e.target.value;
      const finalValue = Number(value) > 100 ? 100 : Number(value);
      if (type === 'min') {
        setPrices([finalValue, prices[1]]);
      }
      if (type === 'max') {
        setPrices([prices[0], finalValue]);
      }
    },
    [prices],
  );
  const updatePrices = (value: number[]) => {
    setPrices(value);
  };

  useEffect(() => {
    updateInitPrices(prices);
  }, [prices, updateInitPrices]);

  return (
    <div className={cn('mt-5 border-y border-y-neutral-100 py-6 pb-7', className)}>
      <p className="font-bold mb-3">Price from and to</p>
      <div className="flex gap-3 mb-5">
        <Input
          name="price-min"
          id="price-min"
          type="number"
          placeholder="0"
          min="0"
          max="100"
          value={prices[0]}
          onChange={e => updateOnePrice(e, 'min')}
        />
        <Input
          name="price-max"
          id="price-max"
          type="number"
          placeholder="100"
          min="0"
          max="100"
          value={prices[1]}
          onChange={e => updateOnePrice(e, 'max')}
        />
      </div>

      <RangeSlider min={0} max={100} step={5} value={prices} onValueChange={updatePrices} />
    </div>
  );
};
