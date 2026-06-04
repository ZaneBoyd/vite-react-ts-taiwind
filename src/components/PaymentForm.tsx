import { useState, useRef, useEffect, useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

export function PaymentForm() {
  const context = useContext(CartContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [payStatus, setPayStatus] = useState<'idle' | 'success'>('idle');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    if (/^\d*$/.test(rawValue)) {
      const formatted = rawValue.replace(/(\d{4})(?=\d)/g, '$1 ');
      setCardNo(formatted);
    }
  };

  const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !cardNo) return alert('请完整填写支付信息！');

    setIsPaying(true);
    timerRef.current = setTimeout(() => {
      setIsPaying(false);
      setPayStatus('success');
      context?.clearCart();
    }, 3000);
  };

  useEffect(() => {
    const timerId = timerRef.current;
    return () => {
      if (timerId) {
        clearTimeout(timerRef.current as number);
      }
    };
  }, []);

  if (payStatus === 'success') {
    return (
      <div className="text-center p-10 bg-white border border-emerald-100 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-emerald-600 mb-2">🎉 支付成功！</h2>
        <p className="text-gray-600">感谢您的信赖，AI 仓储正在为您火速打包发货...</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
        >
          返回收银台
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-emerald-500 p-8 rounded-2xl bg-emerald-50/50 max-w-md mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-500 hover:text-emerald-600 mb-6 flex items-center gap-1 transition-colors"
      >
        ⬅️ 返回修改购物车
      </button>

      <h3 className="text-xl font-bold text-gray-800 mb-6">💳 像素级收银台</h3>

      <form onSubmit={handlePay} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">持卡人姓名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="张三"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">16位信用卡号</label>
          <input
            type="text"
            value={cardNo}
            onChange={handleCardChange}
            maxLength={19}
            placeholder="0000 0000 0000 0000"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-mono transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isPaying}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            isPaying
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
          }`}
        >
          {isPaying ? '🔒 安全加密支付中(3s)...' : '确认安全支付'}
        </button>
      </form>
    </div>
  );
}
