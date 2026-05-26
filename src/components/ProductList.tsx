// src/components/ProductList.tsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useProducts } from '../hooks/useProduct';

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();
  const context = useContext(CartContext);

  if (isLoading) return <div className="text-center py-10 text-gray-500">加载中...</div>;
  if (error) return <div className="text-center py-10 text-red-500">加载失败，请稍后重试</div>;
  if (!context) return null;

  const { addToCart } = context;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products?.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <img src={item.image} alt={item.title} className="w-full h-56 object-contain p-4" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-xl font-bold text-emerald-600 mb-4">${item.price}</p>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
              onClick={() => addToCart(item)}
            >
              加入购物车
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
