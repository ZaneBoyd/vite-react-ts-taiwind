import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import ShopPage from '@/pages/ShopPage';
import PaymentPage from '@/pages/PaymentPage';
import LoginPage from '@/pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 使用布局
    children: [
      { path: '/', element: <ShopPage /> },
      { path: '/payment', element: <PaymentPage /> },
    ],
  }, // 2. 认证视图 (纯净无导航栏)
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <LoginPage /> }],
  },
]);
