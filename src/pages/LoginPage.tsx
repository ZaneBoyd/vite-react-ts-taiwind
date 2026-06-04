// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 模拟 API 调用 (面试加分点：提到 async/await 和错误处理)
      await new Promise((resolve, reject) => {
        setTimeout(() => (Math.random() > 0.2 ? resolve(true) : reject('登录失败')), 1500);
      });

      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <button
        disabled={loading} // 防止重复提交
        className={`w-full py-2 rounded-lg transition-all ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? '验证中...' : '登录'}
      </button>
    </form>
  );
}
