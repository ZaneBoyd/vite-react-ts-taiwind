import { CartContext } from './CartContext';
import type { ReactNode } from 'react';
import { useCart } from '../hooks/useCart';

export function CartProvider({ children }: { children: ReactNode }) {
  const cartApi = useCart();
  return <CartContext.Provider value={cartApi}>{children}</CartContext.Provider>;
}
