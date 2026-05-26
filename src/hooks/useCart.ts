import { useState, useCallback } from 'react';
import type { Product, CartItem } from '../types/store';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 使用useCallBack锁死函数内存地址，防止组件重绘时函数重新创建，性能优化
  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);
  const removeFromCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist && exist.quantity === 1) {
        return prev.filter((item) => item.id != exist.id);
      }
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  }, []);
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  return { cartItems, addToCart, removeFromCart, clearCart };
}
