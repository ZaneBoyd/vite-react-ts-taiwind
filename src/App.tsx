import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import { router } from './routers';

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  );
}
