import { useState } from 'react';
import { CartProvider } from './context/CartProvider';
import { ProductList } from './components/ProductList';
import { CartPanel } from './components/CartPanel';
import { PaymentForm } from './components/PaymentForm';

// 定义视图类型，增加可读性
type ViewMode = 'shop' | 'pay';

export default function App() {
  const [view, setView] = useState<ViewMode>('shop');

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="border-b border-gray-200 pb-4 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              React-Mart 工业级全栈架构示范
            </h1>
          </header>

          <main>
            {view === 'shop' ? (
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                {/* 列表区 - 占据 7 份 */}
                <div className="lg:col-span-7">
                  <ProductList />
                </div>
                {/* 购物车区 - 占据 3 份 */}
                <div className="lg:col-span-3">
                  <CartPanel onGoToPay={() => setView('pay')} />
                </div>
              </div>
            ) : (
              <div className="max-w-xl mx-auto mt-10">
                <PaymentForm onBack={() => setView('shop')} />
              </div>
            )}
          </main>
        </div>
      </div>
    </CartProvider>
  );
}
