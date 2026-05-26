import { useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';

interface CartPanelProps {
  onGoToPay: () => void;
}

export function CartPanel({ onGoToPay }: CartPanelProps) {
  const context = useContext(CartContext);

  const { cartItems, addToCart, removeFromCart } = context || {
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  if (!context) return null;

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400 border-2 border-dashed rounded-xl">
        购物车是空的
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border-2 border-gray-800 p-6 rounded-2xl w-full max-w-sm">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">🛒 我的购物车</h3>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center pb-4 border-b border-gray-200"
          >
            <div className="truncate pr-4">
              <h4 className="text-sm font-medium truncate w-32">{item.title}</h4>
              <span className="text-xs text-gray-500">
                ${item.price} × {item.quantity}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <b className="w-6 text-center">{item.quantity}</b>
              <button
                onClick={() => addToCart(item)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-black transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">总计:</span>
          <span className="text-xl font-bold text-emerald-600">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={onGoToPay}
          className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
        >
          去结算支付 ➡️
        </button>
      </div>
    </div>
  );
}
