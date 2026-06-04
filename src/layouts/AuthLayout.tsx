import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        {/* 认证页通常不需要 Header，只显示表单 */}
        <Outlet />
      </div>
    </div>
  );
}
