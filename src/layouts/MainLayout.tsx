import { Outlet, useNavigate } from 'react-router-dom';

export function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-extrabold">React-Mart</h1>
          {/* 退出按钮 */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
          >
            退出登录
          </button>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
