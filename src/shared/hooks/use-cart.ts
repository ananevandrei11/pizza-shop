import { useEffect } from 'react';
import { useCartStore } from '../store';

export function useCart() {
  const { fetchCartItems, updateItemQuantity, removeCartItem, ...cartState } = useCartStore(
    state => state,
  );

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleUpdateQty = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    if (newQuantity < 1) return;
    updateItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeCartItem(id);
  };

  return { ...cartState, handleUpdateQty, handleRemoveItem };
}
