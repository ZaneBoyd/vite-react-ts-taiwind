import { createContext } from 'react';
import { useCart } from '../hooks/useCart';

type CartContextType = ReturnType<typeof useCart>;
export const CartContext = createContext<CartContextType | undefined>(undefined);
